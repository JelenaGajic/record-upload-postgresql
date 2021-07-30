const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.listings = require("./listing.model.js")(sequelize, Sequelize);
db.images = require("./image.model.js")(sequelize, Sequelize);

db.listings.hasMany(db.images, { 
	foreignKey: 'listingId', 
	onDelete: 'cascade', 
	hooks: true
});
db.images.belongsTo(db.listings);

module.exports = db;