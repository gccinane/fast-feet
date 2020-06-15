import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Order from '../models/Order';
import { checkHourInterval } from '../utils/checkDate';
import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

class InTransitDeliveryController {
  async index(req, res) {
    const deliverymanId = req.params.id;
    const { page = 1, limit = 5 } = req.query;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const orders = await Order.findAll({
      where: {
        deliveryman_id: deliverymanId,
        start_date: { [Op.not]: null },
        end_date: null,
        canceled_at: null,
      },
      limit,
      offset: (page - 1) * limit,
      attributes: ['product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });

    return res.json(orders);
  }

  async update(req, res) {
    const { deliveryId, deliverymanId } = req.params;

    const delivery = await Order.findOne({
      where: {
        deliveryman_id: deliverymanId,
        id: deliveryId,
        canceled_at: null,
        signature_id: null,
        start_date: null,
        end_date: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Order does not exist' });
    }

    const currentDate = new Date();
    if (!checkHourInterval(currentDate)) {
      return res.status(400).json({
        error:
          'Order cannot be taken as the 08:00 to 18:00 hour interval has already passed.',
      });
    }

    const takenOutOrders = await Order.count({
      where: {
        deliveryman_id: deliverymanId,
        start_date: {
          [Op.between]: [startOfDay(currentDate), endOfDay(currentDate)],
        },
      },
    });

    if (takenOutOrders >= 5) {
      return res
        .status(400)
        .json({ error: 'Only 5 orders can be taken out dailly.' });
    }

    const {
      id,
      start_date,
      deliveryman_id,
      recipient_id,
    } = await delivery.update({ start_date: currentDate });

    return res.json({ id, start_date, deliveryman_id, recipient_id });
  }
}

export default new InTransitDeliveryController();
