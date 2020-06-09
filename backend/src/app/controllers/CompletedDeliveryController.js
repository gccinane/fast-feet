import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import { Op } from 'sequelize';

class CompletedDeliveryController {
  async index(req, res) {
    const deliverymanId = Number(req.params.id);

    const orders = await Order.findAll({
      where: {
        deliveryman_id: deliverymanId,
        end_date: { [Op.not]: null },
        start_date: { [Op.not]: null },
      },
      attributes: ['product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'state', 'city', 'zip_code'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name'],
        },
      ],
    });
    return res.json(orders);
  }

  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new CompletedDeliveryController();
