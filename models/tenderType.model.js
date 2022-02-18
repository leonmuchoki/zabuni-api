module.exports = (sequelize, DataTypes) => {
    const TenderType = sequelize.define("tenderTypes", {
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });
    return TenderType;
  };