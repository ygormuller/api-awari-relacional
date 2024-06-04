const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('minhaapi', 'meuusuario', 'minhasenha', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;

