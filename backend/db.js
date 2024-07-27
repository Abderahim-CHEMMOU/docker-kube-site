
require('dotenv').config();

const { Sequelize } = require('sequelize');


const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:password@db-service:5432/todolist';


const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres', // Spécifier le dialecte PostgreSQL
  protocol: 'postgres', 
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' 
  }
});

const Task = sequelize.define('Task', {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
{
  timestamps: true 
}
);

// Initialiser la base de données et créer les tables
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(); // Use `force: true` only for development; it will drop tables if they exist and recreate them.
    console.log('Database synchronized successfully.');

    // // Insérer des données initiales
    // await Task.bulkCreate([
    //   { description: 'Learn Docker' },
    //   { description: 'Create React App' },
    //   { description: 'Build Node.js API' }
    // ]);

    console.log('Initial data inserted successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initializeDatabase();

module.exports = { sequelize, Task };
