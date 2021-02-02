module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('trainers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
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
            avatar: {
                type: DataTypes.STRING
            },
            publicId: {
                type: DataTypes.STRING
            },
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
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
            gender: {
                type: DataTypes.ENUM,
                values: ['male', 'female']
            },
            planId: {
                type: DataTypes.INTEGER
            },
            height: {
                type: DataTypes.STRING
            },
            weight: {
                type: DataTypes.STRING
            },
            isEmailVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            dateOfBirth: {
                type: DataTypes.DATE
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    down: async queryInterface => {
        await queryInterface.dropTable('trainers');
    }
};
