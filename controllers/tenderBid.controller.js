const db = require("../models");
const TenderBid = db.tenderBid;
const User = db.user;
const { sendEmail } = require("../utilities/sendEmail")

exports.createTenderBid = (req, res) => {
  //TODO: Check for bidding only once per tender
    TenderBid.findOne({where: {tenderId:  req.body.tenderId, businessId: req.body.businessId}}).then((bid) => {
        if(bid) {
            return res.status(400).send("Business has already submitted bid for this tender");
        } else {
            TenderBid.create({
                bid_amount: req.body.bid_amount,
                tenderId: req.body.tenderId,
                businessId: req.body.businessId
          })
            .then((tenderBid) => {
                try {
                    User.findByPk(req.userId).then((user) => {
                        const emailText = `Tender bid has been created successfully. Thank you`;
                        const emailTextHTML = `Hello,<br/> <p>Tender bid number:<strong> ${tenderBid.id} </strong>, has been created successfully!</p> <br/> <p>Thank you</p>`;
                        sendEmail(user.email, "muchokileon@gmail.com", "BUSINESS BID", emailText, emailTextHTML);
                    })
                }
                catch(ex) {}
                res.send({ message: "Tender Bid was created successfully!", tenderBid });
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });
        }
    })
};

exports.getAllTenderBids = (req, res) => {
    return TenderBid.findAll().then((tenderBids) => {
    return res.status(200).send({tenderBids});
})
.catch((err) => {
    console.log(">> Error while loading  tender bids: ", err);
    res.status(500).send({ message: err.message });
    });;
};

exports.findTenderBidById = (req, res) => {
    return TenderBid.findAll({where: {id:  req.params.id}}, { include: ["tender", "business"] })
      .then((tenderBid) => {
        //return tender;
        return res.status(200).send({tenderBid});
      })
      .catch((err) => {
        console.log(">> Error while finding tender bid: ", err);
        res.status(500).send({ message: err.message });
      });
};

exports.findBidByTenderId = (req, res) => {
    return TenderBid.findAll({where: {tenderId:  req.params.tenderId}, include: ["tender", "business"] })
      .then((tenderBid) => {
        return res.status(200).send({tenderBid});
      })
      .catch((err) => {
        console.log(">> Error while finding tender bid: ", err);
        res.status(500).send({ message: err.message });
      });
};

exports.findBidByBusinessId = (req, res) => {
    return TenderBid.findAll({where: {businessId:  req.params.businessId}, include: ["tender", "business"] })
      .then((tenderBid) => {
        return res.status(200).send({tenderBid});
      })
      .catch((err) => {
        console.log(">> Error while finding tender bid: ", err);
        res.status(500).send({ message: err.message });
      });
};