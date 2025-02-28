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
      UserId: 1,
      ArticleId: 1
    },
    {
      UserId: 2,
      ArticleId: 2
    }
   ]
   data.forEach(async (favorite) => {
    favorite.createdAt = new Date();
    favorite.updatedAt = new Date();
   });
   await queryInterface.bulkInsert('Favorites', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Favorites', null, {});
  }
};
