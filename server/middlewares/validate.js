import { validationResult } from 'express-validator';
import { moment, httpStatus } from '../config/packages';
import APIError from '../utils/error/APIError';

const validate = async (req, res, next) => {
    // Finds validation errors in the request and wraps them in an array
    const errors = validationResult(req).array();

    if (errors.length) {
        const extractedErrors = [];
        errors.forEach(error => {
            const findError = extractedErrors.filter(err => err === error.msg);
            if (!findError.length) extractedErrors.push(error.msg);
        });
        const err = new APIError(
            extractedErrors.length === 1 ? extractedErrors[0] : extractedErrors,
            httpStatus.BAD_REQUEST, true
        );
        return next(err);
    }
    return next();
};

export const isValidDate = date => moment(new Date(date)).isValid();

export default validate;
