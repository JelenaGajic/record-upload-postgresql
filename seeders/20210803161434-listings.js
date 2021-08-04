const faker = require('faker');
const listings = [...Array(100)].map((listing) => (
  {
    title: faker.name.title(),
    description: faker.name.title(),
    vin: faker.name.title(),
    listingId: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
));
const images = [...Array(100)].map((image, ind) => (
  {
    url: faker.name.title(),
    listingId: listings[ind].listingId,
    createdAt: new Date(),
    updatedAt: new Date()
  }
));
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('listings', listings, {});
    return await queryInterface.bulkInsert('images', images, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('listings', null, {});
  }
};