require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();
const templateRoutes = require('./api/routes/templates');

app.use(compression());
app.use(helmet());

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 10,
});

app.use(limiter);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization',
	);

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
		res.status(200).json({});
	}

	next();
});

app.use('/templates', templateRoutes);

app.use((request, response, next) => {
	const error = new Error('NOT_FOUND');
	error.status = 404;
	next(error);
});

app.use((error, request, response, next) => {
	response.status(error.status || 500);
	response.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
