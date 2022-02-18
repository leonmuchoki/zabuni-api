module.exports = (sequelize, DataTypes) => {
    const Tender = sequelize.define("tenders", {
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      closing_date: {
          type: DataTypes.DATE
      }
    });
    return Tender;
  };