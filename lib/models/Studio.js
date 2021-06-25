import Sequelize from 'sequelize';
import sequelize from '../utils/sequelize.js';

class Studio extends Sequelize.Model{
  
}

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
});

export default Studio;

