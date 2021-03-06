const { Sequelize } = require("../models");
const db = require("../models");
const Listing = db.listings;
const Image = db.images;
const Op = db.Sequelize.Op;

// Create and Save a new Listing
exports.create = (req, res) => {
	 // Validate request
	if (!req.body.title) {
		res.status(400).send({
		message: "Content can not be empty!"
		});
		return;
	}

	// Create a Listing
	const listing = {
		title: req.body.title,
		vin: req.body.vin,
		description: req.body.description,
		listingId: req.body.listingId
	};
	

	// Save Listing in the database
	Listing.create(listing)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while creating the Listing."
		});
		});
		
	// create images
	Image.bulkCreate([
		{ url: req.body.image1, listingId: req.body.listingId },
		{ url: req.body.image2, listingId: req.body.listingId },
		{ url: req.body.image3, listingId: req.body.listingId },
	], { returning: true})
	.then((data) => {
		console.log(">> Created image: " + JSON.stringify(data, null, 4));
	})
	.catch((err) => {
		console.log(">> Error while creating image: ", err);
	});

};

// Retrieve all Listing from the database.
exports.findAll = (req, res) => {
	const vin = req.query.vin;
	var condition = vin ? { vin: { [Op.iLike]: `%${vin}%` } } : null;

	Listing.findAll({ 
		where: condition,
		include: Image })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
				err.message || "Some error occurred while retrieving Listing."
			});
		});
};

// Find a single Listing with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Listing.findByPk(id, {
		include: Image
	})
		.then(data => {
		res.send(data);
		})
		.catch(err => {
		res.status(500).send({
			message: "Error retrieving Listing with id=" + id
		});
		});
};

// Update a Listing by the id in the request
// exports.update = (req, res) => {
// 	const id = req.params.id;

// 	Listing.update(req.body, {
// 		where: { id: id }
// 	})
// 		.then(num => {
// 		if (num == 1) {
// 			res.send({
// 			message: "Listing was updated successfully."
// 			});
// 		} else {
// 			res.send({
// 			message: `Cannot update Listing with id=${id}. Maybe Listing was not found or req.body is empty!`
// 			});
// 		}
// 		})
// 		.catch(err => {
// 		res.status(500).send({
// 			message: "Error updating Listing with id=" + id
// 		});
// 		});
// };

// Delete a Listing with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Listing.destroy({
		where: { listingId: id },
		include: Image
	})
		.then(num => {
		if (num == 1) {
			res.send({
				message: "Listing was deleted successfully!"
			});
		} else {
			res.send({
				message: `Cannot delete Listing with id=${id}. Maybe Listing was not found!`
			});
		}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Listing with id=" + id
			});
		});
};

// Delete all Vehicles from the database.
exports.deleteAll = (req, res) => {
	Listing.destroy({
		where: {},
		include: Image
	})
		.then(nums => {
		res.send({ message: `${nums} Vehicles were deleted successfully!` });
		})
		.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while removing all Vehicles."
		});
		});
};

// Find all published Vehicles
// exports.findAllPublished = (req, res) => {
// 	Listing.findAll({ where: { published: true } })
// 		.then(data => {
// 		res.send(data);
// 		})
// 		.catch(err => {
// 		res.status(500).send({
// 			message:
// 			err.message || "Some error occurred while retrieving Vehicles."
// 		});
// 		});
// };