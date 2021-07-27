module.exports = app => {
	const listings = require("../controllers/listing.controller.js");

	var router = require("express").Router();

	// Create a new Vehicle
	router.post("/", listings.create);

	// Retrieve all listings
	router.get("/", listings.findAll);

	// Retrieve all published listings
	router.get("/published", listings.findAllPublished);

	// Retrieve a single Vehicle with id
	router.get("/:id", listings.findOne);

	// Update a Vehicle with id
	router.put("/:id", listings.update);

	// Delete a Vehicle with id
	router.delete("/:id", listings.delete);

	// Create a new Vehicle
	router.delete("/", listings.deleteAll);

	app.use('/api/listings', router);
};