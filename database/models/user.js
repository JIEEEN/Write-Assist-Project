module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id:{
            type: DataTypes.STRING(30),
            primaryKey: true,
            unique: true
        },
        pwd:{
            type: DataTypes.STRING(100),
            unique: false,
            allowNull: false
        }
    },
    {
        timestamps: false
    })
};