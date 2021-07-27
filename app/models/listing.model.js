module.exports = (sequelize, Sequelize) => {
	const Listing = sequelize.define("listing", {
		title: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		vin: {
			type: Sequelize.STRING
		},
		listingId: {
			type: Sequelize.INTEGER,
			primaryKey: true
		}
	});

	return Listing;
};