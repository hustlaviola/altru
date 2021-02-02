import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    /**
     * @class
     * @description
     * @exports Client
     */
    class Client extends Model {
        /**
         * @method associate
         * @description
         * @static
         * @returns {object} JSON response
         * @memberof Client
         */
        static associate() {
            // define association here
        }

        /**
         * @method toJSON
         * @description
         * @returns {object} JSON response
         * @memberof Client
         */
        toJSON() {
            return { ...this.get(), id: undefined };
        }
    }
    Client.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            firstName: {
                type: DataTypes.STRING
            },
            lastName: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            avatar: {
                type: DataTypes.STRING
            },
            publicId: {
                type: DataTypes.STRING
            },
            country: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            },
            city: {
                type: DataTypes.STRING
            },
            province: {
                type: DataTypes.STRING
            },
            postalCode: {
                type: DataTypes.STRING
            },
            height: {
                type: DataTypes.STRING
            },
            weight: {
                type: DataTypes.STRING
            },
            gender: {
                type: DataTypes.ENUM,
                values: ['male', 'female']
            },
            dateOfBirth: {
                type: DataTypes.DATE
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isEmailVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            tableName: 'clients',
            modelName: 'Client'
        }
    );
    return Client;
};
