import db from '../database/models';

/**
 * @class
 * @description
 * @exports TrainerDAO
 */
export default class TrainerDAO {
    /**
     * @method add
     * @description
     * @static
     * @param {object} trainer
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async add(trainer) {
        return db.Trainer.create(trainer);
    }

    /**
     * @method findById
     * @description
     * @static
     * @param {string} id
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async findById(id) {
        return db.Trainer.findByPk(id);
    }

    /**
     * @method trainerExists
     * @description
     * @static
     * @param {string} id
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async trainerExists(id) {
        return (await db.Trainer.findByPk(id, { attributes: ['uuid'] })) !== null;
    }

    /**
     * @method findIdUuidByEmail
     * @description
     * @static
     * @param {number} email
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async findIdUuidByEmail(email) {
        return db.Trainer.findOne({ where: { email }, attributes: ['id', 'uuid'] });
    }

    /**
     * @method findUsernameById
     * @description
     * @static
     * @param {string} id
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async findUsernameById(id) {
        return db.Trainer.findByPk(id, { attributes: ['username'] });
    }

    /**
     * @method findPublicIdById
     * @description
     * @static
     * @param {string} id
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async findPublicIdById(id) {
        return db.Trainer.findByPk(id, { attributes: ['publicId'] });
    }

    /**
     * @method findByEmail
     * @description
     * @static
     * @param {string} email
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async findByEmail(email) {
        return db.Trainer.findOne({ where: { email } });
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
        return (await db.Trainer.findOne({ where: { email }, attributes: ['uuid'] })) !== null;
    }

    /**
     * @method findByUsername
     * @description
     * @static
     * @param {string} username
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async findByUsername(username) {
        return db.Trainer.findOne({ where: { username } });
    }

    /**
     * @method usernameExists
     * @description
     * @static
     * @param {string} username
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async usernameExists(username) {
        return (await db.Trainer.findOne({ where: { username }, attributes: ['uuid'] })) !== null;
    }

    /**
     * @method update
     * @description
     * @static
     * @param {number} id
     * @param {object} data
     * @returns {object} JSON response
     * @memberof TrainerDAO
     */
    static async update(id, data) {
        return db.Trainer.update(data, { where: { id } });
    }
}
