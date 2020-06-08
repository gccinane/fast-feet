import Mail from '../../lib/Mail';
/*
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
*/
class CreatedOrderMail {
  get key() {
    return 'CreatedOrderMail';
  }

  async handle({ data }) {
    const { recipient, deliveryman } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Encomenda à espera',
      template: 'createdOrder',
      context: {
        recipient: recipient.name,
        deliveryman: deliveryman.name,
      },
    });
  }
}

export default new CreatedOrderMail();
