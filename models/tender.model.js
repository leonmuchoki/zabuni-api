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
      },
      closing_time: {
        type: DataTypes.STRING
      },
      tenderSecurity: {
        type: DataTypes.DECIMAL,
        defaultValue: 0.0
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      ratings: {
        type: DataTypes.INTEGER
      }
    });
    return Tender;
  };