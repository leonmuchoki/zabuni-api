const db = require("../models");
const Tender = db.tender;
const User = db.user;

exports.getContractingAuthorityDashboardStats =async(req, res)=> {
    const businessId = req.params.businessId;
    const staff = User.findAll({where: {companyId: businessId}});
    const tenders = await Tender.findAll({where: {businessId: businessId}});
    const issues = await Issue.findAll({where: {userId: req.userId}});
    
    const stats = {
        issuesCount: issues.length || 0,
        staffCount: staff.length || 0,
        tendersCount: tenders.length || 0,
    };
    
    return res.status(200).send({stats});
}