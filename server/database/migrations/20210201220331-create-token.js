module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('tokens', {
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
        await queryInterface.dropTable('tokens');
    }
};
