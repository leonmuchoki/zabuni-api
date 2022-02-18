const db = require("../models");
const TenderCategory = db.tenderCategory;
// ["PUBLIC", "PRIVATE", "NGO","INSTITUTION","PARASTATAL", "CHURCH", "SACCO"];
exports.createInitialTenderCategories = () => {
    TenderCategory.create({
        name: "Agriculture-and-related-services",
        description: "Agriculture and related services"
    });
    TenderCategory.create({
        name: "Banking Finance Insurance AND Securities (BFIS)",
        description: "Banking Finance Insurance AND Securities-(BFIS)"
    });
    TenderCategory.create({
        name: "BFIS: Insurance",
        description: "BFIS Insurance"
    });
    TenderCategory.create({
        name: "BFIS: Merger AND Acquisition",
        description: "BFIS Merger AND Acquisition"
    });
    TenderCategory.create({
        name: "BFIS Auditing",
        description: " BFIS Auditing"
    });
    TenderCategory.create({
        name: "Business Processing Organisation (BPO)",
        description: "Business-Processing-Organisation-(BPO)"
    });
    TenderCategory.create({
        name: "Consultancy: Architectural",
        description: "Consultancy---Architectural"
    });
    TenderCategory.create({
        name: "Consultancy: Education",
        description: "Consultancy---Education"
    });
    TenderCategory.create({
        name: "Consultancy: Engineering",
        description: "Consultancy---Engineering"
    });
    TenderCategory.create({
        name: "Consultancy: Financial",
        description: "Consultancy---Financial"
    });
    TenderCategory.create({
        name: "Consultancy: Health",
        description: "Consultancy--Health"
    });
    TenderCategory.create({
        name: "Consultancy: HR",
        description: "Consultancy--HR"
    });
    TenderCategory.create({
        name: "Consultancy: IT",
        description: "Consultancy--IT"
    });

    TenderCategory.create({
        name: "Consultancy: Law",
        description: "Consultancy--Law"
    });
    TenderCategory.create({
        name: "Consultancy: Management",
        description: "Consultancy--Management"
    });
    TenderCategory.create({
        name: "Consultancy: Oil AND Gas",
        description: "Consultancy--Oil-AND-Gas"
    });

    TenderCategory.create({
        name: "Consultancy: Security",
        description: "Consultancy--Security"
    });
    TenderCategory.create({
        name: "Consultancy: Tourism",
        description: "Consultancy--Tourism"
    });
    TenderCategory.create({
        name: "Defence",
        description: "Defence"
    });
  };