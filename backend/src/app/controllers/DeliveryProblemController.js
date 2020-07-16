import * as Yup from 'yup';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import DeliveryProblem from '../models/DeliveryProblem';
import CanceledDeliveryMail from '../jobs/CanceledDeliveryMail';
import Queue from '../../lib/Queue';
import { Op } from 'sequelize';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const deliveryId = req.params.id;

    const delivery = await Order.findOne({
      where: {
        id: deliveryId,
        canceled_at: null,
        start_date: { [Op.not]: null },
        end_date: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    const { id, description, delivery_id } = await DeliveryProblem.create({
      description: req.body.description,
      delivery_id: deliveryId,
    });

    return res.json(id, description, delivery_id);
  }

  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const deliveries = await Order.findAll({
      where: { canceled_at: null },
      include: [
        {
          model: DeliveryProblem,
          as: 'problems',
          where: { delivery_id: { [Op.not]: null } },
        },
      ],
      limit,
      offset: (page - 1) * limit,
      order: ['id'],
    });
    return res.json(deliveries);
  }

  async show(req, res) {
    const deliveryId = req.params.id;

    const delivery = await Order.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }
    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id: deliveryId },
    });

    if (!deliveryProblems) {
      return res.status(400).json({ error: 'No delivery problems ' });
    }
    return res.json(deliveryProblems);
  }

  async delete(req, res) {
    const problemId = req.params.id;

    const problem = await DeliveryProblem.findByPk(problemId);

    if (!problem) {
      return res.status(400).json({ error: 'Delivery problem does not exist' });
    }

    const delivery = await Order.findOne({
      where: { id: problem.delivery_id, canceled_at: null },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
        },
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery already canceled' });
    }

    await delivery.update({
      canceled_at: new Date(),
    });

    Queue.add(CanceledDeliveryMail.key, { delivery, problem });

    return res.json({ message: 'Delivery successfully canceled' });
  }
}

export default new DeliveryProblemController();
