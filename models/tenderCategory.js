module.exports = (sequelize, DataTypes) => {
    const TenderCategory = sequelize.define("tenderCategories", {
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });
    return TenderCategory;
  };