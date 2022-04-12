//sectors: public, private...
module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define("issues", {
      description: {
        type: DataTypes.STRING
      },
      is_resolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
    return Issue;
  };