import { httpStatus } from '../config/packages';
import ClientDAO from '../data/ClientDAO';
import TrainerDAO from '../data/TrainerDAO';
import { iLogger, eLogger } from '../config/logger';
import messages from '../utils/messages';
import Helper from '../utils/Helper';
import TokenDAO from '../data/TokenDAO';
import EmailService from './Email';

/**
 * @class
 * @description
 * @exports AuthService
 */
export default class AuthService {
    /**
     * @method clientLogin
     * @description
     * @static
     * @returns {object} JSON response
     * @memberof AuthService
     */
    static async clientLogin({ email, password }) {
        email = email.toLowerCase();
        try {
            let client = await ClientDAO.findByEmail(email);
            if (!client) {
                return {
                    isSuccessful: false,
                    status: httpStatus.BAD_REQUEST,
                    message: messages.invalidCred,
                    isPublic: true
                };
            }
            client = client.dataValues;
            const match = await Helper.comparePassword(password, client.password);
            iLogger.info('match == ', match);
            if (!match) {
                return {
                    isSuccessful: false,
                    status: httpStatus.BAD_REQUEST,
                    message: messages.invalidCred,
                    isPublic: true
                };
            }
            const payload = { id: client.id, uuid: client.uuid };
            const token = await Helper.generateToken(payload);
            return {
                isSuccessful: true,
                data: {
                    uuid: client.uuid,
                    firstName: client.firstName,
                    lastName: client.lastName,
                    username: client.username,
                    email: client.email,
                    gender: client.gender,
                    country: client.country,
                    city: client.city,
                    province: client.province,
                    address: client.address,
                    height: client.height,
                    weight: client.country,
                    dateOfBirth: client.dateOfBirth,
                    token
                }
            };
        } catch (error) {
            eLogger.error('An error occurred while logging in', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }

    /**
     * @method trainerLogin
     * @description
     * @static
     * @returns {object} JSON response
     * @memberof AuthService
     */
    static async trainerLogin({ email, password }) {
        email = email.toLowerCase();
        try {
            let trainer = await TrainerDAO.findByEmail(email);
            iLogger.info('TRAINER LOGIN == ', trainer);
            if (!trainer) {
                return {
                    isSuccessful: false,
                    status: httpStatus.BAD_REQUEST,
                    message: messages.invalidCred,
                    isPublic: true
                };
            }
            trainer = trainer.dataValues;
            const match = await Helper.comparePassword(password, trainer.password);
            iLogger.info('match == ', match);
            if (!match) {
                return {
                    isSuccessful: false,
                    status: httpStatus.BAD_REQUEST,
                    message: messages.invalidCred,
                    isPublic: true
                };
            }
            const payload = { id: trainer.id, uuid: trainer.uuid };
            const token = await Helper.generateToken(payload);
            return {
                isSuccessful: true,
                data: {
                    uuid: trainer.uuid,
                    firstName: trainer.firstName,
                    lastName: trainer.lastName,
                    username: trainer.username,
                    email: trainer.email,
                    gender: trainer.gender,
                    country: trainer.country,
                    city: trainer.city,
                    province: trainer.province,
                    address: trainer.address,
                    height: trainer.height,
                    weight: trainer.country,
                    dateOfBirth: trainer.dateOfBirth,
                    token
                }
            };
        } catch (error) {
            eLogger.error('An error occurred while logging in', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }

    /**
     * @method clientForgotPassword
     * @description
     * @static
     * @param {string} email
     * @returns {object} JSON response
     * @memberof AuthService
     */
    static async clientForgotPassword(email) {
        try {
            email = email.toLowerCase();
            let user = await ClientDAO.findIdUuidByEmail(email);
            iLogger.info('USER  ', user);
            if (!user) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.userNotFound,
                    isPublic: true
                };
            }
            user = user.dataValues;
            const code = Helper.generateRandomDigits(6);
            const obj = {
                userUuid: user.uuid, email, code, role: 'client', tokenType: 'password'
            };
            await TokenDAO.add(user.id, obj);
            const html = `<p>Password reset code</p><br><h1>${code}</h1>`;
            await EmailService.sendAMail(email, 'Password Reset', html);
            return { isSuccessful: true };
        } catch (error) {
            eLogger.error('An error occurred while sending password reset code', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }

    /**
     * @method trainerForgotPassword
     * @description
     * @static
     * @param {string} email
     * @returns {object} JSON response
     * @memberof AuthService
     */
    static async trainerForgotPassword(email) {
        try {
            email = email.toLowerCase();
            let user = await TrainerDAO.findIdUuidByEmail(email);
            iLogger.info('USER  ', user);
            if (!user) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.userNotFound,
                    isPublic: true
                };
            }
            user = user.dataValues;
            const code = Helper.generateRandomDigits(6);
            const obj = {
                userUuid: user.uuid, email, code, role: 'trainer', tokenType: 'password'
            };
            await TokenDAO.add(user.id, obj);
            const html = `<p>Password reset code</p><br><h1>${code}</h1>`;
            await EmailService.sendAMail(email, 'Password Reset', html);
            return { isSuccessful: true };
        } catch (error) {
            eLogger.error('An error occurred while sending password reset code', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }

    /**
     * @method clientResetPassword
     * @description
     * @static
     * @returns {object} JSON response
     * @memberof AuthService
     */
    static async clientResetPassword({ code, email, password }) {
        try {
            email = email.toLowerCase();
            const token = await TokenDAO.findByCodeEmailRole(code, email, 'client');
            if (!token) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.codeNotFound,
                    isPublic: true
                };
            }
            await token.destroy();
            password = await Helper.encryptPassword(password);
            await ClientDAO.update(token.userId, { password });
            return { isSuccessful: true };
        } catch (error) {
            eLogger.error('An error occurred while resetting password', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }

    /**
     * @method trainerResetPassword
     * @description
     * @static
     * @returns {object} JSON response
     * @memberof AuthService
     */
    static async trainerResetPassword({ code, email, password }) {
        try {
            email = email.toLowerCase();
            const token = await TokenDAO.findByCodeEmailRole(code, email, 'trainer');
            if (!token) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.codeNotFound,
                    isPublic: true
                };
            }
            await token.destroy();
            password = await Helper.encryptPassword(password);
            await TrainerDAO.update(token.userId, { password });
            return { isSuccessful: true };
        } catch (error) {
            eLogger.error('An error occurred while resetting password', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }
}
