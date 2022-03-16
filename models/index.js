//TODO: Notification for new tenders

require('dotenv').config();
//console.log(process.env)
//const config = require("../config/db.config.js");
const isProduction = process.env.NODE_ENV === 'production'
const Sequelize = require("sequelize");


const sequelize =  !isProduction ? new Sequelize(
    process.env.DB_DATABASE,//config.DB,
    process.env.DB_USER,//config.USER,
    process.env.DB_PASSWORD,//config.PASSWORD,
  {
    host: process.env.DB_HOST,//config.HOST,
    dialect: process.env.DB_DIALECT,//config.dialect,
    operatorsAliases: false,
    pool: {
      max: +process.env.POOL_MAX,//config.pool.max,
      min: +process.env.POOL_MIN,//config.pool.min,
      acquire: process.env.POOL_ACQUIRE,//config.pool.acquire,
      idle: process.env.POOL_IDLE,//config.pool.idle
    }
  }
) :
new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
//db.ROLES = ["business", "admin", "supplier"];

db.business = require("../models/business.model")(sequelize, Sequelize);
db.user.hasMany(db.business, { as: "business" });
db.business.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
});

db.company = require("../models/company.model.js")(sequelize, Sequelize);
db.tender = require("../models/tender.model.js")(sequelize, Sequelize);
db.tenderType = require("../models/tenderType.model")(sequelize, Sequelize);
db.tenderCategory = require("../models/tenderCategory")(sequelize, Sequelize);
db.tenderDocument = require("../models/tenderDocument.model")(sequelize, Sequelize);
db.sector = require("../models/sector.model.js")(sequelize, Sequelize);
db.categories = require("../models/category.model.js")(sequelize, Sequelize);

db.company.hasMany(db.tender, { as: "tenders" });
db.tender.belongsTo(db.company, {
  foreignKey: "companyId",
  as: "company"
});

db.tenderType.hasMany(db.tender, { as: "tenders" });
db.tender.belongsTo(db.tenderType, {
  foreignKey: "tenderTypeId",
  as: "tenderType"
});

db.tenderCategory.hasMany(db.tender, { as: "tenders" });
db.tender.belongsTo(db.tenderCategory, {
  foreignKey: "tenderCategoryId",
  as: "tenderCategory"
});

db.tender.hasMany(db.tenderDocument, { as: "tenderDocuments" });
db.tenderDocument.belongsTo(db.tender, {
  foreignKey: "tenderId",
  as: "tender"
});

db.sector.hasMany(db.company, { as: "company" });
db.company.belongsTo(db.sector, {
  foreignKey: "sectorId",
  as: "sector"
});

db.sector.hasMany(db.tender, { as: "tenders" });
db.tender.belongsTo(db.sector, {
  foreignKey: "sectorId",
  as: "sector"
});
//db.SECTORS = ["PUBLIC", "PRIVATE", "NGO","INSTITUTION","PARASTATAL", "CHURCH", "SACCO"];

db.document = require("../models/document.model.js")(sequelize, Sequelize);
db.documentType = require("../models/documentType.model")(sequelize, Sequelize);
db.documentType.hasMany(db.document, { as: "documents" });
db.document.belongsTo(db.documentType, {
  foreignKey: "documentTypeId",
  as: "documentType"
});

db.user.hasMany(db.document, { as: "documents" });
db.document.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
});

db.businessDocument = require("../models/businessDocument.model")(sequelize, Sequelize);
db.business.hasMany(db.businessDocument, { as: "businessDocuments" });
db.businessDocument.belongsTo(db.business, {
  foreignKey: "businessId",
  as: "business"
});

module.exports = db;