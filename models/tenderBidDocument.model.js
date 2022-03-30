module.exports = (sequelize, DataTypes) => {
    const TenderBidDocument = sequelize.define("tenderBidDocuments", {
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
    return TenderBidDocument;
  };