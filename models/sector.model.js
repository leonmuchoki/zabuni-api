//sectors: public, private...
module.exports = (sequelize, DataTypes) => {
    const Sector = sequelize.define("sectors", {
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });
    return Sector;
  };