const db = require("../models");

const findOne = async (req, res) => {
	const result = await db.Tree.findOne({ [root[0]]: req.body.name })
	res.json(result)
}

const create = async (req, res) => await db.Tree.create(req.body)

const addFactory = async (req, res) => {
	const result = await db.Tree.findOneAndUpdate(
		{_id: req.params.id}, 
		{$addToSet:
			{'root': req.body},
			new: true
		}
		)
			res.json(result)
}

const pullFactory = (req, res) => {
	db.Tree
		.findOneAndUpdate({}, {
			$pull: {
				"root": req.body
			},
			new: true
		})
		.then(dbModel => {
			res.json(dbModel)
		})
		.catch(err => res.status(422).json(err));
}

const changeName = (req, res) => {
	db.Tree
		.findOneAndUpdate({}, {
			$pull: {
				"root": req.body[0]
			},
			new: true
		})
		.then(dbModel => {
			db.Tree
		})
		.catch(err => res.status(422).json(err));
	db.Tree
		.findOneAndUpdate({
			_id: req.params.id
		}, {
			$addToSet: {
				'root': req.body[1]
			},
			new: true
		})
		.then((dbModel) => {
			res.json(dbModel)
		})
		.catch(err => res.status(422).json(err));
}

const changeRange = (req, res) => {
	db.Tree
		.findOneAndUpdate({}, {
			$pull: {
				"root": req.body[0]
			},
			new: true
		})
		.then(dbModel => {
			db.Tree
		})
		.catch(err => res.status(422).json(err));
	db.Tree
		.findOneAndUpdate({
			_id: req.params.id
		}, {
			$addToSet: {
				'root': req.body[1]
			},
			new: true
		})
		.then((dbModel) => {
			res.json(dbModel)
		})
		.catch(err => res.status(422).json(err));
}


module.exports = {
	findOne,
	changeName,
	changeRange,
	create,
	addFactory,
	pullFactory,

}