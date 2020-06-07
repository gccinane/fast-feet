import Deliveryman from '../models/Deliveryman';
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
      return res.status(400).json({ error: 'Email already exists' });
    }

    const { name, email } = await Deliveryman.create(req.body);

    return res.json({ name, email });
  }

  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      attributes: ['name', 'email'],
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

    const foundDeliveryman = await Deliveryman.findByPk(req.params.id);

    if (!foundDeliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    if (foundDeliveryman.email !== req.body.email) {
      const userExists = await Deliveryman.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    const { name, email } = await foundDeliveryman.update(req.body);

    return res.json({ name, email });
  }
}

export default new DeliverymanController();
