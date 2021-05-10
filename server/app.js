const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const errorHandlers = require('./handlers/error-handlers');
const templateRoutes = require('./routes/templates');

const app = express();

app.use(compression());
app.use(helmet());

const origin = {
	origin: '*',
};

app.use(cors(origin));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/templates', templateRoutes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.productionErrors);

module.exports = app;
