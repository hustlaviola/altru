import db from '../database/models';

/**
 * @class
 * @description
 * @exports ClientDAO
 */
export default class ClientDAO {
    /**
     * @method add
     * @description
     * @static
     * @param {object} client
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async add(client) {
        return db.Client.create(client);
    }

    /**
     * @method findById
     * @description
     * @static
     * @param {string} id
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async findById(id) {
        return db.Client.findByPk(id);
    }

    /**
     * @method clientExists
     * @description
     * @static
     * @param {string} id
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async clientExists(id) {
        return (await db.Client.findByPk(id, { attributes: ['uuid'] })) !== null;
    }

    /**
     * @method findIdUuidByEmail
     * @description
     * @static
     * @param {number} email
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async findIdUuidByEmail(email) {
        return db.Client.findOne({ where: { email }, attributes: ['id', 'uuid'] });
    }

    /**
     * @method findUsernameById
     * @description
     * @static
     * @param {number} id
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async findUsernameById(id) {
        return db.Client.findByPk(id, { attributes: ['username'] });
    }

    /**
     * @method findPublicIdById
     * @description
     * @static
     * @param {number} id
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async findPublicIdById(id) {
        return db.Client.findByPk(id, { attributes: ['publicId'] });
    }

    /**
     * @method findByEmail
     * @description
     * @static
     * @param {string} email
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async findByEmail(email) {
        return db.Client.findOne({ where: { email } });
    }

    /**
     * @method emailExists
     * @description
     * @static
     * @param {string} email
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async emailExists(email) {
        return (await db.Client.findOne({ where: { email }, attributes: ['uuid'] })) !== null;
    }

    /**
     * @method findByUsername
     * @description
     * @static
     * @param {string} username
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async findByUsername(username) {
        return db.Client.findOne({ where: { username } });
    }

    /**
     * @method usernameExists
     * @description
     * @static
     * @param {string} username
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async usernameExists(username) {
        return (await db.Client.findOne({ where: { username }, attributes: ['uuid'] })) !== null;
    }

    /**
     * @method update
     * @description
     * @static
     * @param {number} id
     * @param {object} data
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async update(id, data) {
        return db.Client.update(data, { where: { id } });
    }
}
