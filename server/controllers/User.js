import { httpStatus } from '../config/packages';
import APIError from '../utils/error/APIError';
import successResponse from '../utils/successResponse';
import UserService from '../services/User';

/**
 * @class
 * @description
 * @exports UserController
 */
export default class UserController {
    /**
     * @method checkUsername
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof UserController
     */
    static async checkUsername(req, res, next) {
        const rsp = await UserService.checkUsername(req.query.username);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'username is available');
    }
}
