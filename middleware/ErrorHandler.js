exports.errorHandler = (error, req, res, next) => {
	const errorCode = error.statusCode;
	const errorMessage = error.message;
	const errorResponse = {
		error: errorMessage
	};
	res.status(errorCode).json(errorResponse);
	next();
}
