import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Order from '../models/Order';
import { Op } from 'sequelize';

class InTransitDeliveryController {
  async index(req, res) {
    const deliverymanId = req.params.id;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const orders = await Order.findAll({
      where: {
        deliveryman_id: deliverymanId,
        [Op.and]: [
          { start_date: { [Op.not]: null } },
          { end_date: { [Op.not]: null } },
        ],
      },
      attributes: ['product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'state', 'city', 'zip_code'],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new InTransitDeliveryController();
