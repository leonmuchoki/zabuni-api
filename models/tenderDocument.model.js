module.exports = (sequelize, DataTypes) => {
    const TenderDocument = sequelize.define("tenderDocuments", {
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });
    return TenderDocument;
  };