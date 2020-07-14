import * as Yup from 'yup';
import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Queue from '../../lib/Queue';
import CreatedOrderMail from '../jobs/CreatedOrderMail';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id, recipient_id, product } = req.body;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const recipient = await Recipient.findByPk(recipient_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const { id } = await Order.create({
      deliveryman_id,
      recipient_id,
      product,
    });

    await Queue.add(CreatedOrderMail.key, {
      recipient,
      deliveryman,
    });

    return res.json(id, product, recipient_id, deliveryman_id);
  }

  async index(req, res) {
    const { page = 1, limit = 20, q = '' } = req.query;
    console.log(q);
    const orders = await Order.findAll({
      where: {
        product: {
          [Op.iLike]: `%${q}%`,
        },
      },
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      order: ['id'],
      limit,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return res.json(orders);
  }

  /**
   *
   * admin pode alterar a data de inicio e fim, tambem pode alterar a
   * data do final para ser anterior a de inicio e vice versa
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    const { deliveryman_id, recipient_id } = req.body;

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    if (deliveryman_id && !(await Deliveryman.findByPk(deliveryman_id))) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    if (recipient_id && !(await Recipient.findByPk(recipient_id))) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const { id, start_date, end_date, product } = await order.update(req.body);

    return res.json(
      id,
      start_date,
      end_date,
      product,
      recipient_id,
      deliveryman_id
    );
  }

  async delete(req, res) {
    const orderId = req.params.id;

    const order = await Order.findOne({
      where: { id: orderId, canceled_at: null },
    });

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }
    const currentDate = new Date();

    await order.update({ canceled_at: currentDate });

    return res.status(200).json({ message: 'Order successfully deleted' });
  }
}

export default new OrderController();
