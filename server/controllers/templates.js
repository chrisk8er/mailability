const { db } = require('../config');

exports.add = async (req, res, next) => {
	const { title, content } = req.body;

	await db
		.none('INSERT INTO templates (title, content) VALUES ($1,  $2)', [title, content])
		.then(() => {
			res.status(201).json({
				status: 'success',
				message: 'TEMPLATE_CREATED',
			});
		});
};

exports.findAll = async (req, res, next) => {
	await db.any('SELECT * FROM templates').then((result) => {
		res.status(200).json({
			count: result.length,
			list: result,
		});
	});
};

exports.findOne = async (req, res, next) => {
	const { template_id } = req.query;

	await db.one('SELECT * FROM templates WHERE template_id = $1', template_id).then((result) => {
		res.status(200).json(result);
	});
};

exports.update = async (req, res, next) => {
	const { title, content, template_id } = req.body;

	await db
		.none('UPDATE templates SET title = $1, content = $2 WHERE template_id = $3', [
			title,
			content,
			template_id,
		])
		.then(() => {
			res.status(200).json({
				status: 'success',
				message: `TEMPLATE_UPDATED`,
			});
		});
};

exports.remove = async (req, res, next) => {
	const { template_id } = req.query;

	await db.result('DELETE FROM templates WHERE template_id = $1', template_id).then(() => {
		res.status(200).json({
			status: 'success',
			message: 'TEMPLATE_DELETED',
		});
	});
};
