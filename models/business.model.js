//TODO:
/*
-Incorporation/Registration number
*/
module.exports = (sequelize, DataTypes) => {
    const Business = sequelize.define("business", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        registration_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Business;
  };