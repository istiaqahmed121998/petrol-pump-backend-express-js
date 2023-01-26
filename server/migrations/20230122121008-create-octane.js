'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Octanes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      },
      time: {
        type: Sequelize.STRING
      },
      shift: {
        type: Sequelize.STRING
      },
      prev_stock: {
        type: Sequelize.DECIMAL
      },
      new_stock: {
        type: Sequelize.DECIMAL
      },
      total_stock: {
        type: Sequelize.DECIMAL
      },
      sell_quantity: {
        type: Sequelize.DECIMAL
      },
      buy_rate: {
        type: Sequelize.DECIMAL
      },
      sell_rate: {
        type: Sequelize.DECIMAL
      },
      invest: {
        type: Sequelize.DECIMAL
      },
      earn: {
        type: Sequelize.DECIMAL
      },
      profit: {
        type: Sequelize.DECIMAL
      },
      manager: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Managers',
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Octanes');
  }
};