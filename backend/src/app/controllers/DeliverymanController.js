import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import * as Yup from 'yup';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const emailExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: 'Deliveryman email already exists' });
    }

    const { name, email } = await Deliveryman.create(req.body);

    return res.json({ name, email });
  }

  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      order: [['id', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const deliverymanId = req.params.id;
    const foundDeliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!foundDeliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    if (foundDeliveryman.email !== req.body.email) {
      const userEmailExists = await Deliveryman.findOne({
        where: { email: req.body.email },
      });

      if (userEmailExists) {
        return res
          .status(400)
          .json({ error: 'Deliveryman email already exists' });
      }
    }

    const { name, email } = await foundDeliveryman.update(req.body);

    return res.json({ name, email });
  }

  async delete(req, res) {
    const deliverymanId = req.params.id;

    const foundDeliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!foundDeliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    (await foundDeliveryman).destroy();

    return res.json({ message: 'Deliveryman successfully deleted.' });
  }
}

export default new DeliverymanController();
