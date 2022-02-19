const db = require("../models");
const DocumentType = db.documentType;
// ["PUBLIC", "PRIVATE", "NGO","INSTITUTION","PARASTATAL", "CHURCH", "SACCO"];
exports.createInitialDocumentTypes = () => {
    DocumentType.create({
        name: "Profile Form",
        description: "supplier profile form"
    });
    DocumentType.create({
        name: "Tax Compliance Certificate",
        description: "tax compliance certificate"
    });
    DocumentType.create({
        name: "KRA Pin Certificate",
        description: "KRA Pin certificate"
    });
    DocumentType.create({
        name: "Cr12 Certificate ",
        description: "Cr 12 Certificate "
    });
    DocumentType.create({
        name: "Business Incorporation Certificate",
        description: "Business Incorporation certificate"
    });
  };