const db = require("../models");

// Defining methods for the TreesController
const findAll = async (req, res) => {
const data = await	db.Tree.find(req.query)
console.log('Here ============', data)
data.res.json()
		// .catch(err => res.status(422).json(err));
}

const findOne = (req, res) => {
	db.Tree
		.findOne({
			[root[0]]: req.body.name
		}, (err, data) => {
		})
		.sort({ date: -1 })
		.then(dbModel => {
			res.json(dbModel)
		})
		.catch(err => res.status(422).json(err));
}

const findById = (req, res) => {
	db.Tree
		.findById(req.params.id)
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
}

const create = (req, res) => {
	db.Tree
		.create(req.body)
		.then(dbModel => {
			res.json(dbModel)
		})
		.catch(err => res.status(422).json(err));
}

const addFactory = (req, res) => {
	db.Tree
		.findOneAndUpdate(
			{ _id: req.params.id }, { $addToSet: { 'root': req.body }, new: true })
		.then(dbModel => {
			res.json(dbModel)
		})
		.catch(err => res.status(422).json(err));
}

const pullFactory = (req, res) => {
	db.Tree
		.findOneAndUpdate(
			{}, { $pull: { "root": req.body }, new: true })
		.then(dbModel => {
			res.json(dbModel)
		})
		.catch(err => res.status(422).json(err));
}

const changeName = (req, res) => {
	db.Tree
		.findOneAndUpdate(
			{}, { $pull: { "root": req.body[0] }, new: true })
		.then(dbModel => {
			db.Tree
		})
		.catch(err => res.status(422).json(err));
	db.Tree
		.findOneAndUpdate(
			{ _id: req.params.id }, { $addToSet: { 'root': req.body[1] }, new: true })
		.then((dbModel) => {
			res.json(dbModel)
		})
		.catch(err => res.status(422).json(err));
}

const changeRange = (req, res) => {
	db.Tree
		.findOneAndUpdate(
			{}, { $pull: { "root": req.body[0] }, new: true })
		.then(dbModel => {
			db.Tree
		})
		.catch(err => res.status(422).json(err));
	db.Tree
		.findOneAndUpdate(
			{ _id: req.params.id }, { $addToSet: { 'root': req.body[1] }, new: true })
		.then((dbModel) => {
			res.json(dbModel)
		})
		.catch(err => res.status(422).json(err));
}


module.exports = {
	findAll,
	findById,
	findOne,
	changeName,
	changeRange,
	create,
	addFactory,
	pullFactory,

}