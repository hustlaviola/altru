import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { jwt } from '../config/packages';

/**
 * @class Helper
 * @description An helper class for onboarding
 * @exports Helper
 */
export default class Helper {
    /**
     * @method encryptPassword
     * @description Encrypt password
     * @static
     * @param {object} password - Password being encrypted
     * @returns {object} JSON response
     * @memberof Helper
     */
    static encryptPassword(password) {
        return bcrypt.hash(password, 12);
    }

    /**
     * @method comparePassword
     * @description compare given password with db password
     * @static
     * @param {object} password - Given password
     * @param {object} hashPassword - Db password
     * @returns {object} JSON response
     * @memberof Helper
     */
    static comparePassword(password, hashPassword) {
        return bcrypt.compare(password, hashPassword);
    }

    /**
     * @method generateToken
     * @description Generates token for securing endpoints
     * @static
     * @param {object} data - data object
     * @returns {object} JSON response
     * @memberof Helper
     */
    static generateToken(data) {
        return jwt.sign(data, process.env.SECRET, { expiresIn: '365d' });
    }

    /**
     * @method generateDbToken
     * @description Generates a token for email service
     * @static
     * @returns {object} JSON response
     * @memberof Helper
     */
    static generateDbToken() {
        return crypto.randomBytes(16).toString('hex');
    }

    /**
     * @method generateRandomDigits
     * @description Generates a token for email service
     * @static
     * @param {number} limit - data object
     * @returns {object} JSON response
     * @memberof Helper
     */
    static generateRandomDigits(limit) {
        return Math.floor(Math.random() * limit);
    }
}
