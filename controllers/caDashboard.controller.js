const db = require("../models");
const Tender = db.tender;
const User = db.user;
const Issue = db.issue;

exports.getContractingAuthorityDashboardStats =async(req, res)=> {
    try {
        const businessId = req.params.businessId;
        const staff = await User.findAll({where: {companyId: +businessId}});
        const tenders = await Tender.findAll({where: {businessId: +businessId}});
        const issues = await Issue.findAll({where: {userId: req.userId || 0}});
        
        const stats = {
            issuesCount: issues.length || 0,
            staffCount: staff.length || 0,
            tendersCount: tenders.length || 0,
        };
        return res.status(200).send({stats});
    } catch(ex) { 
        return res.status(400).send({ex: JSON.stringify(ex)});
    }
    
    
}