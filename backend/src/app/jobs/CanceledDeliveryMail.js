import Mail from '../../lib/Mail';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
class CanceledDeliveryMail {
  get key() {
    return 'CanceledDeliveryMail';
  }

  async handle({ data }) {
    const { delivery, problem } = data;
    console.log(delivery, problem);
    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,

      subject: 'Entrega Cancelada',
      template: 'canceledDelivery',
      context: {
        product: delivery.product,
        deliveryman: delivery.deliveryman.name,
        recipient: delivery.recipient.name,
        street: delivery.recipient.street,
        number: delivery.recipient.number,
        complement: delivery.recipient.complement || 'Sem complemento',
        city: delivery.recipient.city,
        state: delivery.recipient.state,
        zip_code: delivery.recipient.zip_code,
        date: format(
          parseISO(delivery.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        description: problem.description,
      },
    });
  }
}

export default new CanceledDeliveryMail();
