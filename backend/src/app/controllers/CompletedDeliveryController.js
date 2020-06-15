import Order from '../models/Order';
import Recipient from '../models/Recipient';

import File from '../models/File';
import { Op } from 'sequelize';
import * as Yup from 'yup';

class CompletedDeliveryController {
  async index(req, res) {
    const deliverymanId = req.params.id;
    const { page = 1, limit = 10 } = req.query;
    const orders = await Order.findAll({
      where: {
        deliveryman_id: deliverymanId,
        end_date: { [Op.not]: null },
        start_date: { [Op.not]: null },
        canceled_at: null,
      },
      limit,
      offset: (page - 1) * limit,
      attributes: ['product', 'start_date', 'end_date'],
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

  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'To complete a delivery you must send the signature' });
    }

    const { deliverymanId, deliveryId } = req.params;

    const signaturePhoto = await File.findByPk(req.body.signature_id);

    if (!signaturePhoto) {
      return res.status(400).json({ error: 'Signature picture not found' });
    }

    const delivery = await Order.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
        start_date: { [Op.not]: null },
        end_date: null,
      },
    });

    if (!delivery) {
      return res.json({ error: 'Delivery not found' });
    }

    const currentDate = new Date();

    const {
      product,
      end_date,
      start_date,
      id,
      recipient_id,
      deliveryman_id,
    } = await delivery.update({
      end_date: currentDate,
      signature_id: signaturePhoto.id,
    });

    return res.json({
      product,
      end_date,
      start_date,
      id,
      recipient_id,
      deliveryman_id,
    });
  }
}

export default new CompletedDeliveryController();
