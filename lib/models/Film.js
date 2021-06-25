import Sequelize from 'sequelize';
import db from '../utils/db.js';

class Film extends Sequelize.Model {}

Film.init(
  {
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    studio: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false
    },
    released: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    }
  }
);
