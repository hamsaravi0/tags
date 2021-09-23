const { query, validationResult } = require('express-validator');
const { CustomError } = require('./CustomError');
const { TagsDNEError, SortByInvalidError, DirectionInvalidError } = require('./ErrorTypes');

const postQueryRules = () => {
    return [
        query('tags').exists().withMessage(TagsDNEError).bail().isString(),
        query('sortBy').optional().isString().bail().isIn(['id', 'reads', 'likes', 'popularity']).withMessage(SortByInvalidError),
        query('direction').optional().isString().bail().isIn(['asc', 'desc']).withMessage(DirectionInvalidError)
    ]
}
const postQueryValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const paramError = errors.array()[0].msg
    if (typeof paramError === "string") {
        throw new CustomError(400, paramError);
    }
    else {
        throw paramError;
    }
}

module.exports = { postQueryRules, postQueryValidator }
