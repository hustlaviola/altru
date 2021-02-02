import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    /**
     * @class
     * @description
     * @exports Plan
     */
    class Plan extends Model {
        /**
         * @method associate
         * @description
         * @static
         * @returns {object} JSON response
         * @memberof Plan
         */
        static associate({ Trainer }) {
            // define association here
            this.hasMany(Trainer, { foreignKey: 'planId', as: 'trainers' });
        }

        /**
         * @method toJSON
         * @description
         * @returns {object} JSON response
         * @memberof Plan
         */
        toJSON() {
            return { ...this.get(), id: undefined };
        }
    }
    Plan.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING
            },
            price: {
                type: DataTypes.DECIMAL(10, 2)
            }
        },
        {
            sequelize,
            tableName: 'plans',
            modelName: 'Plan'
        }
    );
    return Plan;
};
