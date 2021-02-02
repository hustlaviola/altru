import { httpStatus } from '../config/packages';
import APIError from '../utils/error/APIError';
import successResponse from '../utils/successResponse';
import ClientService from '../services/Client';

/**
 * @class
 * @description
 * @exports ClientController
 */
export default class ClientController {
    /**
     * @method updateUsername
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof ClientController
     */
    static async updateUsername(req, res, next) {
        const rsp = await ClientService.updateUsername(req.user.id, req.body.username);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'username updated successfully', rsp.data);
    }

    /**
     * @method updateAvatar
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof ClientController
     */
    static async updateAvatar(req, res, next) {
        const rsp = await ClientService.updateAvatar(req.user.id, req.files);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'avatar updated successfully', rsp.data);
    }

    /**
     * @method updateProfile
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof ClientController
     */
    static async updateProfile(req, res, next) {
        const rsp = await ClientService.updateProfile(req.user.id, req.body);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'profile updated successfully', rsp.data);
    }
}
