//sectors: public, private...
module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define("issues", {
      description: {
        type: DataTypes.STRING
      }
    });
    return Issue;
  };