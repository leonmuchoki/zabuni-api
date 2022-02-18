module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define("documents", {
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
    return Document;
  };