import { httpStatus } from '../config/packages';

import { eLogger } from '../config/logger';
import messages from '../utils/messages';
import ClientDAO from '../data/ClientDAO';
import TrainerDAO from '../data/TrainerDAO';

/**
 * @class
 * @description
 * @exports UserService
 */
export default class UserService {
    /**
     * @method checkUsername
     * @description
     * @static
     * @param {string} username
     * @returns {object} JSON response
     * @memberof UserService
     */
    static async checkUsername(username) {
        try {
            const client = await ClientDAO.usernameExists(username);
            if (client) {
                return {
                    isSuccessful: false,
                    status: httpStatus.CONFLICT,
                    message: messages.usernameInUse,
                    isPublic: true
                };
            }
            const trainer = await TrainerDAO.usernameExists(username);
            if (trainer) {
                return {
                    isSuccessful: false,
                    status: httpStatus.CONFLICT,
                    message: messages.usernameInUse,
                    isPublic: true
                };
            }
            return { isSuccessful: true };
        } catch (error) {
            eLogger.error('An error occurred while checking username', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }
}
