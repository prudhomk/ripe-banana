import sequelize from './lib/utils/sequelize.js';

run();

async function run() {
  await sequelize.sync({ alter: true });
}
