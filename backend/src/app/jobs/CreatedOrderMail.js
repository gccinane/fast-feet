import Mail from '../../lib/Mail';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
class CreatedOrderMail {
  get key() {
    return 'CreatedOrderMail';
  }

  async handle({ data }) {
    const { order } = data;
    await Mail.sendMail({ order });
  }
}

export default new CreatedOrderMail();
