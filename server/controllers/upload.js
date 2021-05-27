const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(reg, file, next) {
		if (file.mimetype.startsWith('image/')) {
			next(null, true);
		} else {
			next({ message: 'FILETYPE_NOT_ALLOWED' }, false);
		}
	},
};

exports.upload = multer(multerOptions).single('file');

exports.resize = async (req, res, next) => {
	if (!req.file) {
		return;
	}

	const extension = req.file.mimetype.split('/')[1];
	req.body.file = `${uuid.v4()}.${extension}`;

	const file = await jimp.read(req.file.buffer);
	file.write(`./public/images/${req.body.file}`);

	const url = isProduction
		? process.env.IMG + req.body.file
		: `http://${process.env.HOST}:${process.env.PORT}/images/${req.body.file}`;

	res.status(200).json({
		status: 'success',
		url,
	});
};
