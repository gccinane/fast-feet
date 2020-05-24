import Sequelize, { Model } from 'sequelize';
class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        street_number: Sequelize.STRING,
        address_complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
      },
      { sequelize }
    );
  }
}

export default Recipient;
