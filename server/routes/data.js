var Sequelize=require('sequelize');

var connection = new Sequelize('word', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false, // prevent string deprication
    pool: { // You can read about the pool in the documentation
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: { // Sequelize define timestamp columns by default. To prevent it we will defind the following line
        timestamps: false
    }
});

const Table = connection.define('word_tables', {
  word: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  counter: {
    type: Sequelize.INTEGER
  },
},{
  freezeTableName:true
});

module.exports = {Sequelize, connection, Table}