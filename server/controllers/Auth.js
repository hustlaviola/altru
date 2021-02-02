import { httpStatus } from '../config/packages';
import AuthService from '../services/Auth';
import APIError from '../utils/error/APIError';
import successResponse from '../utils/successResponse';

/**
 * @class
 * @description
 * @exports AuthController
 */
export default class AuthController {
    /**
     * @method clientLogin
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof AuthController
     */
    static async clientLogin(req, res, next) {
        const rsp = await AuthService.clientLogin(req.body);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'login successful', rsp.data);
    }

    /**
     * @method trainerLogin
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof AuthController
     */
    static async trainerLogin(req, res, next) {
        const rsp = await AuthService.trainerLogin(req.body);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'login successful', rsp.data);
    }

    /**
     * @method clientForgotPassword
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof AuthController
     */
    static async clientForgotPassword(req, res, next) {
        const rsp = await AuthService.clientForgotPassword(req.body.email);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'Password reset code sent to your email');
    }

    /**
     * @method trainerForgotPassword
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof AuthController
     */
    static async trainerForgotPassword(req, res, next) {
        const rsp = await AuthService.trainerForgotPassword(req.body.email);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'Password reset code sent to your email');
    }

    /**
     * @method clientResetPassword
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof AuthController
     */
    static async clientResetPassword(req, res, next) {
        const rsp = await AuthService.clientResetPassword(req.body);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'Password reset successful');
    }

    /**
     * @method trainerResetPassword
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof AuthController
     */
    static async trainerResetPassword(req, res, next) {
        const rsp = await AuthService.trainerResetPassword(req.body);
        if (!rsp.isSuccessful) {
            return next(new APIError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, 'Password reset successful');
    }
}
