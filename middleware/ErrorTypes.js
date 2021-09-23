const { CustomError } = require("./CustomError");

const TagsDNEError = new CustomError(400, "Tags parameter is required.");
const SortByInvalidError = new CustomError(400, "sortBy parameter is invalid.");
const DirectionInvalidError = new CustomError(400, "direction parameter is invalid.");
const InternalServerError = new CustomError(500, "Internal Server Error, Please try again later.");

module.exports = {
    TagsDNEError, SortByInvalidError, DirectionInvalidError, InternalServerError
}
