'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = [
    {
      UserName: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      imgUrl: 'https://via.placeholder.com/150'
    },
    {
      UserName: 'admin',
      email: 'admin@mail.com',
      password: '12345',
      imgUrl: 'https://th.bing.com/th/id/OIP.gPVFtDRbSFwyyAsWHVoqGQHaEK?rs=1&pid=ImgDetMain'
    },
    {
      UserName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password',
      imgUrl: 'https://via.placeholder.com/150'
    }
   ]

   data.forEach(async (user) => {
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.password = hashPassword(user.password)
   });

   await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
