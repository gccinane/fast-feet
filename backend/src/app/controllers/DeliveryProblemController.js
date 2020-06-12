import * as Yup from 'yup';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const deliveryId = req.params.id;

    const delivery = await Order.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      description: req.body.description,
      delivery_id: deliveryId,
    });

    return res.json(deliveryProblem);
  }

  /**
   * lista todos os problemas
   */
  async index(req, res) {
    const deliveries = await DeliveryProblem.findAll({
      attributes: ['description', 'delivery_id'],
      include: [
        {
          model: Order,
          attributes: ['product'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['name', 'email'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'name',
                'street',
                'street_number',
                'address_complement',
                'state',
                'city',
                'zip_code',
              ],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id'],
            },
          ],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const deliveryId = req.params.id;

    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id: deliveryId },
    });

    if (!deliveryProblems) {
      return res.status(400).json({ error: 'Delivery does not ' });
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
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery already canceled' });
    }
    await delivery.update({
      canceled_at: new Date(),
    });

    return res.json({ message: 'Delivery successfully canceled' });
  }
}

export default new DeliveryProblemController();
