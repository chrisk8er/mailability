const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const errorHandlers = require('./handlers/error-handlers');
const templateRoutes = require('./routes/templates');
const uploadRoutes = require('./routes/upload');

const app = express();

app.use(compression());
app.use(helmet());

const origin = {
	origin: '*',
};

app.use(cors(origin));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use('/templates', templateRoutes);
app.use('/upload', uploadRoutes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.productionErrors);

module.exports = app;
