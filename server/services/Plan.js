import { httpStatus } from '../config/packages';
import { iLogger, eLogger } from '../config/logger';
import PlanDAO from '../data/PlanDAO';

/**
 * @class
 * @description
 * @exports PlanService
 */
export default class PlanService {
    /**
     * @method getPlans
     * @description
     * @static
     * @returns {object} JSON response
     * @memberof PlanService
     */
    static async getPlans() {
        try {
            const plans = await PlanDAO.findAll();
            iLogger.info('PLANS == ', plans);
            return {
                isSuccessful: true,
                data: plans.dataValues
            };
        } catch (error) {
            eLogger.error('An error occurred while getting plans', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }

    /**
     * @method getPlan
     * @description
     * @static
     * @param {number} id
     * @returns {object} JSON response
     * @memberof PlanService
     */
    static async getPlan(id) {
        try {
            const plan = await PlanDAO.findById(id);
            iLogger.info('PLAN == ', plan);
            return {
                isSuccessful: true,
                data: plan.dataValues
            };
        } catch (error) {
            eLogger.error('An error occurred while getting plan', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }
}
