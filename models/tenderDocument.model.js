module.exports = (sequelize, DataTypes) => {
    const TenderDocument = sequelize.define("tenderDocuments", {
      name: {
        type: DataTypes.STRING
      },
      blobName: {
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
    return TenderDocument;
  };