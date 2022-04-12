const db = require("../models");
const Business = db.business;
const Issue = db.issue;

exports.getAdminDashboardStats =async(req, res)=> {
    const businesses = await Business.findAll();
    const issues = await Issue.findAll();
    const suppliersCount = businesses.filter(x => !x.isContractingAuthority).length;
    const organizationCount = businesses.filter(x => x.isContractingAuthority == true).length;
    const issuesCount = issues.length;
    
    const stats = {
        suppliersCount,
        organizationCount,
        issuesCount,
        businesses,
        issues
    };
    
    return res.status(200).send({stats});
}