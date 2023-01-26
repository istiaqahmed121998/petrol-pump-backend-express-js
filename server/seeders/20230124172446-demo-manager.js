"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *    
     Example:*/
    await queryInterface.bulkInsert(
      "Managers",
      [
        {
          manager_name: "All",
          phone_number: "0",
          shift: "12:01AM to 12:00PM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          manager_name: "Apple",
          phone_number: "01746036970",
          shift: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          manager_name: "Liton",
          phone_number: "0174343223",
          shift: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          manager_name: "Sohidul Islam",
          phone_number: "01905736846",
          shift: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
