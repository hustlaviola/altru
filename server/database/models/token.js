import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    /**
     * @class
     * @description
     * @exports Token
     */
    class Token extends Model {
        /**
         * @method associate
         * @description
         * @static
         * @returns {object} JSON response
         * @memberof Token
         */
        static associate() {
            // define association here
        }

        /**
         * @method toJSON
         * @description
         * @returns {object} JSON response
         * @memberof Token
         */
        toJSON() {
            return { ...this.get(), id: undefined };
        }
    }
    Token.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            userId: {
                type: DataTypes.INTEGER
            },
            userUuid: {
                type: DataTypes.UUID
            },
            email: {
                type: DataTypes.STRING
            },
            token: {
                type: DataTypes.STRING
            },
            code: {
                type: DataTypes.INTEGER
            },
            tokenType: {
                type: DataTypes.ENUM,
                values: ['email', 'password']
            },
            role: {
                type: DataTypes.ENUM,
                values: ['client', 'trainer']
            }
        },
        {
            sequelize,
            tableName: 'tokens',
            modelName: 'Token'
        }
    );
    return Token;
};
