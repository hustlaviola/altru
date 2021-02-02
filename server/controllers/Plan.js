import { httpStatus } from '../config/packages';
import PlanService from '../services/Plan';
import APIError from '../utils/error/APIError';
import successResponse from '../utils/successResponse';

/**
 * @class
 * @description
 * @exports PlanController
 */
export default class PlanController {
    /**
     * @method getPlans
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof PlanController
     */
    static async getPlans(req, res, next) {
        const rsp = await PlanService.getPlans();
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'Plans retrieved successfully', rsp.data);
    }

    /**
     * @method getPlan
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof PlanController
     */
    static async getPlan(req, res, next) {
        const rsp = await PlanService.getPlan(req.params.planId);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'Plan retrieved successfully', rsp.data);
    }
}
