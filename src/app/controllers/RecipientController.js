import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      street_number: Yup.string().required(),
      address_complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { zip_code: req.body.zip_code },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const {
      name,
      street,
      street_number,
      address_complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      name,
      street,
      street_number,
      address_complement,
      state,
      city,
      zip_code,
    });
  }

  async index() {}

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      street_number: Yup.string().required(),
      address_complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    if (await Recipient.findOne({ where: { zip_code: req.body.zip_code } })) {
      return res
        .status(401)
        .json({ error: 'Recipient Zip code already exists' });
    }

    const {
      name,
      street,
      street_number,
      address_complement,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      name,
      street,
      street_number,
      address_complement,
      state,
      city,
      zip_code,
    });
  }

  async delete() {}
}

export default new RecipientController();
