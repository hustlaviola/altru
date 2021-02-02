import db from '../database/models';

/**
 * @class
 * @description
 * @exports PlanDAO
 */
export default class PlanDAO {
    /**
     * @method findById
     * @description
     * @static
     * @param {string} id
     * @returns {object} JSON response
     * @memberof PlanDAO
     */
    static async findById(id) {
        return db.Plan.findByPk(id);
    }

    /**
     * @method findIdById
     * @description
     * @static
     * @param {number} id
     * @returns {object} JSON response
     * @memberof ClientDAO
     */
    static async planExists(id) {
        return (await db.Plan.findByPk(id, { attributes: ['id'] })) !== null;
    }

    /**
     * @method findAll
     * @description
     * @static
     * @returns {object} JSON response
     * @memberof PlanDAO
     */
    static async findAll() {
        return db.Plan.findAll();
    }
}
