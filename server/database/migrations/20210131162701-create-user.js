module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            avatar: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            country: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            province: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.ENUM,
                values: ['male', 'female']
            },
            height: {
                type: Sequelize.STRING
            },
            weight: {
                type: Sequelize.STRING
            },
            isEmailVerified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            dateOfBirth: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async queryInterface => {
        await queryInterface.dropTable('Users');
    }
};
