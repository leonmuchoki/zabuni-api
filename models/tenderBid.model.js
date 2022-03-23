//sectors: public, private...
module.exports = (sequelize, DataTypes) => {
    const TenderBid = sequelize.define("tenderBids", {
      bid_amount: {
        type: DataTypes.DECIMAL
      }
    });
    
    return TenderBid;
  };