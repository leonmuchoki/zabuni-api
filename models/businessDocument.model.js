module.exports = (sequelize, DataTypes) => {
    const BusinessDocument = sequelize.define("businessDocuments", {
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      extension: {
          type: DataTypes.STRING
      },
      fileSize: {
          type: DataTypes.INTEGER
      },
      file: {
          type: DataTypes.BLOB('long')
      }
    });
    return BusinessDocument;
  };