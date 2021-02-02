import { httpStatus } from '../config/packages';
import APIError from '../utils/error/APIError';
import successResponse from '../utils/successResponse';
import TrainerService from '../services/Trainer';

/**
 * @class
 * @description
 * @exports TrainerController
 */
export default class TrainerController {
    /**
     * @method updateUsername
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof TrainerController
     */
    static async updateUsername(req, res, next) {
        const rsp = await TrainerService.updateUsername(req.user.id, req.body.username);
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
     * @memberof TrainerController
     */
    static async updateAvatar(req, res, next) {
        const rsp = await TrainerService.updateAvatar(req.user.id, req.files);
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
     * @memberof TrainerController
     */
    static async updateProfile(req, res, next) {
        const rsp = await TrainerService.updateProfile(req.user.id, req.body);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'profile updated successfully', rsp.data);
    }

    /**
     * @method updatePlan
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof TrainerController
     */
    static async updatePlan(req, res, next) {
        const rsp = await TrainerService.updatePlan(req.user.id, req.params.planId);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'Plan updated successfully', rsp.data);
    }
}
