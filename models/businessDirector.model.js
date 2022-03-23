module.exports = (sequelize, DataTypes) => {
    const BusinessDirector = sequelize.define("businessDirectors", {
      name: {
        type: DataTypes.STRING
      },
      id_number: {
        type: DataTypes.STRING
      }
    });
    return BusinessDirector;
  };