import { httpStatus, uuid } from '../config/packages';
import EmailService from './Email';
import { iLogger, eLogger } from '../config/logger';
import messages from '../utils/messages';
import Helper from '../utils/Helper';
import promiseHandler from '../utils/promiseHandler';
import TokenDAO from '../data/TokenDAO';
import ClientDAO from '../data/ClientDAO';
import TrainerDAO from '../data/TrainerDAO';

/**
 * @class
 * @description
 * @exports OnboardingService
 */
export default class OnboardingService {
    /**
     * @method addClient
     * @description
     * @static
     * @param {string} host
     * @returns {object} JSON response
     * @memberof OnboardingService
     */
    static async addClient({ email, password }, host) {
        email = email.toLowerCase();
        try {
            const emailExists = await ClientDAO.emailExists(email);
            iLogger.info('emailExists == ', emailExists);
            if (emailExists) {
                return {
                    isSuccessful: false,
                    status: httpStatus.CONFLICT,
                    message: messages.emailInUse,
                    isPublic: true
                };
            }
            password = await Helper.encryptPassword(password);
            let user = await ClientDAO.add({
                email, password, publicId: `PB-${uuid()}`
            });
            user = user.dataValues;
            iLogger.info('CREATED USER == ', user);
            const token = Helper.generateDbToken();
            await TokenDAO.add(user.uuid, { token, tokenType: 'email' });
            const payload = { id: user.id, uuid: user.uuid };
            const authToken = await Helper.generateToken(payload);
            await promiseHandler(EmailService.sendEmailVerificationLink(
                'there', email, token, host
            ));
            return {
                isSuccessful: true,
                data: {
                    id: user.id,
                    email: user.email,
                    token: authToken
                }
            };
        } catch (error) {
            eLogger.error('An error occurred while adding user', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }

    /**
     * @method addTrainer
     * @description
     * @static
     * @param {string} host
     * @returns {object} JSON response
     * @memberof OnboardingService
     */
    static async addTrainer({ email, password }, host) {
        email = email.toLowerCase();
        try {
            const emailExists = await TrainerDAO.emailExists(email);
            iLogger.info('emailExists == ', emailExists);
            if (emailExists) {
                return {
                    isSuccessful: false,
                    status: httpStatus.CONFLICT,
                    message: messages.emailInUse,
                    isPublic: true
                };
            }
            password = await Helper.encryptPassword(password);
            let user = await TrainerDAO.add({
                email, password, publicId: `PB-${uuid()}`
            });
            user = user.dataValues;
            iLogger.info('CREATED USER == ', user);
            const token = Helper.generateDbToken();
            await TokenDAO.add(user.id, { userUuid: user.uuid, token, tokenType: 'email' });
            const payload = { id: user.id, uuid: user.uuid };
            const authToken = await Helper.generateToken(payload);
            await promiseHandler(EmailService.sendEmailVerificationLink(
                'there', email, token, host
            ));
            return {
                isSuccessful: true,
                data: {
                    id: user.id,
                    email: user.email,
                    token: authToken
                }
            };
        } catch (error) {
            eLogger.error('An error occurred while adding user', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }
}
