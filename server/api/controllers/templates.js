const { pool } = require('../../config');

function errorHandling(error) {
	if (error) {
		throw error;
	}
}

const create = (request, response) => {
	const { title } = request.body;

	pool.query('INSERT INTO templates (title) VALUES ($1)', [title], (error) => {
		errorHandling(error);
		response.status(201).json({ status: 'success', message: 'TEMPLATE_CREATED.' });
	});
};

const findAll = (request, response) => {
	pool.query('SELECT * FROM templates', (error, results) => {
		errorHandling(error);
		response.status(200).json(results.rows);
	});
};

const findOne = (request, response) => {
	const id = parseInt(request.params.id, 10);

	pool.query('SELECT * FROM templates WHERE id = $1', [id], (error, results) => {
		errorHandling(error);
		response.status(200).json(results.rows);
	});
};

const update = (request, response) => {
	const { title } = request.body;
	const { id } = request.params;

	pool.query('UPDATE templates SET title = $1 WHERE id = $2', [title, id], (error) => {
		errorHandling(error);
		response.status(200).json({
			message: `TEMPLATE_UPDATED`,
		});
	});
};

const remove = (request, response) => {
	const { id } = request.params;

	pool.query('DELETE FROM templates WHERE id = $1', [id], (error) => {
		errorHandling(error);
		response.status(200).json({
			message: `TEMPLATE_DELETED`,
		});
	});
};

module.exports = {
	create,
	findAll,
	findOne,
	update,
	remove,
};
