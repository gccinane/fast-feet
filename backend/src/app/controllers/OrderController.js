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
    return res.json({ ok: true });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new OrderController();
