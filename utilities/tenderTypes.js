const db = require("../models");
const Tendertype = db.tenderType;
// ["PUBLIC", "PRIVATE", "NGO","INSTITUTION","PARASTATAL", "CHURCH", "SACCO"];
exports.createInitialTenderTypes = () => {
    Tendertype.create({
        name: "Invitation-toTender",
        description: "Invitation to Tender"
    });
    Tendertype.create({
        name: "Request-For-Quotation",
        description: "Request For Quotation"
    });
    Tendertype.create({
        name: "Expression-of-Interest",
        description: "Expression of Interest"
    });
    Tendertype.create({
        name: "Call-For-Proposals",
        description: "Call For Proposals"
    });
    Tendertype.create({
        name: "Cancellation-of-Tender",
        description: "Cancellation of Tender"
    });
    Tendertype.create({
        name: "Extension-of-Tender",
        description: "Extension of Tender"
    });
    Tendertype.create({
        name: "EOI-Prequalification",
        description: "EOI Prequalification"
    });
    Tendertype.create({
        name: "Re-advertised",
        description: "Re advertised"
    });
    Tendertype.create({
        name: "Request-for-Proposals",
        description: "Request for Proposals"
    });
    Tendertype.create({
        name: "RFP-Pre-Qualification",
        description: "RFP Pre Qualification"
    });
    Tendertype.create({
        name: "Invitation-for-Bids",
        description: "Invitation for Bids"
    });
    Tendertype.create({
        name: "Request-for-Proposals-Request-for-Quotation",
        description: "Request for Proposals Request for Quotation"
    });
    Tendertype.create({
        name: "Pre-Qualification",
        description: "Pre Qualification"
    });
  };