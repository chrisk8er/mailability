exports.catchErrors = (fn) =>
	function (req, res, next) {
		return fn(req, res, next).catch(next);
	};

exports.notFound = (req, res, next) => {
	const err = new Error('NOT_FOUND');
	err.status = 404;
	next(err);
};

exports.productionErrors = (err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message,
		},
	});
};
