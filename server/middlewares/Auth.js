import { httpStatus, jwt, validator } from '../config/packages';
import messages from '../utils/messages';
import APIError from '../utils/error/APIError';

/**
 * @class
 * @description
 * @exports Auth
 */
export default class Auth {
    /**
     * @method userAuth
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof Auth
     */
    static userAuth(req, res, next) {
        if (!req.headers.authorization) {
            return next(new APIError(
                messages.invalidSession, httpStatus.UNAUTHORIZED, true
            ));
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return next(new APIError(
                messages.invalidToken, httpStatus.UNAUTHORIZED, true
            ));
        }

        if (!validator.isJWT(token)) {
            return next(new APIError(
                messages.invalidToken, httpStatus.UNAUTHORIZED, true
            ));
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = decoded;
            return next();
        } catch (error) {
            const message = Auth.getTokenErrorMessage(error);
            return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
        }
    }

    /**
     * @method noCache
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof Auth
     */
    static async noCache(req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        return next();
    }

    /**
     * @method getTokenErrorMessage
     * @description get jwt error message
     * @static
     * @param {object} error - Request object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof Auth
     */
    static getTokenErrorMessage(error) {
        const expMessage = 'your session has expired, please login again';
        const errorMessage = error.message === 'jwt expired' ? expMessage : 'Authentication failed';
        return errorMessage;
    }
}
