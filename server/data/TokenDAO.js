import db from '../database/models';

/**
 * @class
 * @description
 * @exports TokenDAO
 */
export default class TokenDAO {
    /**
     * @method add
     * @description
     * @static
     * @param {number} userId
     * @param {object} tokenObj
     * @returns {object} JSON response
     * @memberof TokenDAO
     */
    static async add(userId, tokenObj) {
        const dbToken = await db.Token.findOne({
            where: { userId, tokenType: tokenObj.tokenType }
        });
        if (dbToken) {
            return db.Token.update(tokenObj, { where: { userId } });
        }
        return db.Token.create({ userId, ...tokenObj });
    }

    /**
     * @method findByCodeEmailRole
     * @description
     * @static
     * @param {string} code
     * @param {string} email
     * @param {string} role
     * @returns {object} JSON response
     * @memberof TokenService
     */
    static async findByCodeEmailRole(code, email, role) {
        return db.Token.findOne({ where: { code, email, role } });
    }

    /**
     * @method find
     * @description
     * @static
     * @param {string} token
     * @param {string} tokenType
     * @returns {object} JSON response
     * @memberof TokenService
     */
    static async find(token, tokenType) {
        return db.Token.findOne({ where: { token, tokenType } });
    }
}
