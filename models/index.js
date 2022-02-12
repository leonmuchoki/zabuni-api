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
db.ROLES = ["business", "admin", "supplier"];
module.exports = db;