import Sequelize from 'sequelize';
import db from '../utils/db.js';


class Studio extends Sequelize.Model{}

Studio.init({
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  city: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true
  }
},
{
  sequelize: db,
  modelName: 'Studio', 
  underscored: true,
}
);


export default Studio;

