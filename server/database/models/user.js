module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        avatar: { type: DataTypes.STRING },
        country: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        province: { type: DataTypes.STRING },
        height: { type: DataTypes.STRING },
        weight: { type: DataTypes.STRING },
        gender: { type: DataTypes.ENUM, values: ['male', 'female'] },
        dateOfBirth: { type: DataTypes.DATE },
        password: { type: DataTypes.STRING, allowNull: false },
        isEmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {});
    // User.associate = models => {
    //   User.hasMany(models.Request, {
    //     as: 'requester',
    //     foreignKey: 'userId',
    //     onDelete: 'CASCADE'
    //   });
    // };
    return User;
};
