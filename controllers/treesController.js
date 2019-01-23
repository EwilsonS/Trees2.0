const db = require("../models");

// Defining methods for the TreesController
module.exports = {
	findAll: (req, res) => {
		db.Tree
			.find(req.query)
			.sort({ date: -1 })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	findOne: (req, res) => {
		db.Tree
			.findOne({
				[root[0]]: req.body.name
			}, (err, data) => {
				console.log(data)
			})
			.sort({ date: -1 })
			.then(dbModel => {
				res.json(dbModel)
			})
			.catch(err => res.status(422).json(err));
	},
	findById: (req, res) => {
		db.Tree
			.findById(req.params.id)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	create: (req, res) => {
		db.Tree
			.create(req.body)
			.then(dbModel => {
				res.json(dbModel)
				console.log(`=============================`)
				console.log(`===== Created new tree ======`)
				console.log(`=============================`)
				console.log(`${dbModel}`)
			})
			.catch(err => res.status(422).json(err));
	},
	addFactory: (req, res) => {
		console.log(req.body)
		db.Tree
			.findOneAndUpdate(
				{ _id: req.params.id }, { $addToSet: { 'root': req.body }, new: true })
			.then(dbModel => {
				res.json(dbModel)
				console.log(`=============================`)
				console.log(`===== Added new factory =====`)
				console.log(`=============================`)
				console.log(dbModel)
			})
			.catch(err => res.status(422).json(err));
	},
	pullFactory: (req, res) => {
		console.log(JSON.stringify(req.body))
		db.Tree
			.findOneAndUpdate(
				{}, { $pull: { "root": req.body }, new: true })
			.then(dbModel => {
				res.json(dbModel)
				console.log(`=============================`)
				console.log(`===== Removed Factory =======`)
				console.log(`=============================`)
				console.log(dbModel)
			})
			.catch(err => res.status(422).json(err));
	},
	changeName: (req, res) => {
		console.log(req.body)
		db.Tree
			.findOneAndUpdate(
				{}, { $pull: { "root": req.body[0] }, new: true })
			.then(dbModel => {
				console.log(`=============================`)
				console.log(`=== RENAMED PT.1 Factory ====`)
				console.log(`=============================`)
				console.log(dbModel)
				db.Tree
			})
			.catch(err => res.status(422).json(err));
		db.Tree
			.findOneAndUpdate(
				{ _id: req.params.id }, { $addToSet: { 'root': req.body[1] }, new: true })
			.then((dbModel) => {
				res.json(dbModel)
				console.log(`=============================`)
				console.log(`=== RENAMED PT.2 Factory ====`)
				console.log(`=============================`)
				console.log(dbModel)
			})
			.catch(err => res.status(422).json(err));
	},
	changeRange: (req, res) => {
		console.log(req.body)
		db.Tree
			.findOneAndUpdate(
				{}, { $pull: { "root": req.body[0] }, new: true })
			.then(dbModel => {
				console.log(`=============================`)
				console.log(`=== NEW RANGE PT.1 ====`)
				console.log(`=============================`)
				console.log(dbModel)
				db.Tree
			})
			.catch(err => res.status(422).json(err));
		db.Tree
			.findOneAndUpdate(
				{ _id: req.params.id }, { $addToSet: { 'root': req.body[1] }, new: true })
			.then((dbModel) => {
				res.json(dbModel)
				console.log(`=============================`)
				console.log(`=== NEW RANGE PT.2 ====`)
				console.log(`=============================`)
				console.log(dbModel)
			})
			.catch(err => res.status(422).json(err));
	}


}