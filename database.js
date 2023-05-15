const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('aula', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: true,
});

sequelize.authenticate()
  .then(() => {
    console.log('Banco conectado com sucesso');
  })
  .catch(err => {
    console.error('Nao foi possivel conectar devido ao erro:', err);
  });

sequelize.sync({force: true})
.then(() => {
  console.log('sincronizado');
})
.catch(err => {
  console.error('Nao foi possivel sincronizar devido ao erro:', err);
});

module.exports = sequelize;
