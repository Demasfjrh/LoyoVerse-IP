'use strict';

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
        title: 'Article 1',
        imgUrl: 'https://via.placeholder.com/150',
        description: 'Description 1'
      },
      {
        title: 'Article 2',
        imgUrl: 'https://via.placeholder.com/150',
        description: 'Description 2'
      }
    ]
    data.forEach(async (article) => {
      article.createdAt = new Date();
      article.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Articles', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
