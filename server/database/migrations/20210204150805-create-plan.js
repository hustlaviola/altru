module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('plans', {
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
            name: {
                type: DataTypes.STRING
            },
            price: {
                type: DataTypes.DECIMAL(10, 2)
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
        await queryInterface.dropTable('plans');
    }
};
