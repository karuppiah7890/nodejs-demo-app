const { Sequelize } = require('sequelize');

let dbConnURL = process.env.DB_URL || 'postgres://user:pass@example.com:5432/dbname'

const sequelize = new Sequelize(dbConnURL)

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
