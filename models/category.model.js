//sectors: public, private...
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("categories", {
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });
    return Category;
  };