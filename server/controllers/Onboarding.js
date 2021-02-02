import { httpStatus } from '../config/packages';
import OnboardingService from '../services/Onboarding';
import APIError from '../utils/error/APIError';
import successResponse from '../utils/successResponse';

/**
 * @class
 * @description
 * @exports OnboardingController
 */
export default class OnboardingController {
    /**
     * @method clientSignUp
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof OnboardingController
     */
    static async clientSignUp(req, res, next) {
        const rsp = await OnboardingService.addClient(req.body, req.headers.host);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.CREATED, 'Onboarding successful', rsp.data);
    }

    /**
     * @method trainerSignUp
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof OnboardingController
     */
    static async trainerSignUp(req, res, next) {
        const rsp = await OnboardingService.addTrainer(req.body, req.headers.host);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.CREATED, 'Onboarding successful', rsp.data);
    }
}
