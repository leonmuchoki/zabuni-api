const db = require("../models");
const TenderBid = db.tenderBid;
const Issue = db.issue;
const BusinessDirector = db.businessDirector;

exports.getSupplierProfileStats =async(req, res)=> {
    const tenderBids = await TenderBid.findAll({where: {businessId:  req.params.businessId}});
    const issues = await Issue.findAll({where: {userId: req.userId}});
    const directors = await  BusinessDirector.findAll({where: {businessId: req.params.businessId }})
    
    const stats = {
        directors,
        tenderBids,
        issues
    };
    
    return res.status(200).send({stats});
}