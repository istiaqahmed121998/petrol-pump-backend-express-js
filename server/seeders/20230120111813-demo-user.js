"use strict";
const bcrypt= require("bcryptjs")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Imrul Islam",
          email: "imrulislam064@gmail.com",
          password: await bcrypt.hash("admin123", 10),
          phone:"01982279320",
          address:'32/A/18 sadek filling station, rayer bazar, Mohammadpur Dhaka 1207',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Fahim Sadek",
          email: "fahimsadekkhan@gmail.com",
          password: await bcrypt.hash("admin123", 10),
          phone:"01720310163",
          address:'32/a/18 rayerbazar beribadh',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Md Istiaq Ahmed",
          email: "istiaqahmed121998@gmail.com",
          password: await bcrypt.hash("admin123", 10),
          phone:"01776065208",
          address:'75/1 Jafrabad Pulpar Pabna House Gali',
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
    return queryInterface.bulkDelete("Users", null, {});
  },
};
