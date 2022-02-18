module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("companies", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        website: {
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
    return Company;
  };