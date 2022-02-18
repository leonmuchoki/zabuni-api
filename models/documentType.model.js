module.exports = (sequelize, Sequelize) => {
    const DocumentType = sequelize.define("documentTypes", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
    return DocumentType;
  };