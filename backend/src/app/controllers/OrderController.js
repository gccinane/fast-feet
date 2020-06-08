import * as Yup from 'yup';
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

    const order = await Order.create({
      deliveryman_id,
      recipient_id,
      product,
    });

    await Queue.add(CreatedOrderMail.key, {
      recipient,
      deliveryman,
    });

    return res.json({ order });
  }

  async index(req, res) {
    const orders = await Order.findAll({
      attributes: ['recipient_id', 'deliveryman_id', 'product'],
    });
    return res.json(orders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id, recipient_id } = req.body;
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    console.log('mano');
    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    if (deliveryman_id && !(await Deliveryman.findByPk(deliveryman_id))) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    if (recipient_id && !(await Recipient.findByPk(recipient_id))) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }
    console.log('dasd');
    const updatedOrder = await order.update(req.body);

    return res.json(updatedOrder);
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new OrderController();
