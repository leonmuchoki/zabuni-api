//TODO: VERIFY SUPPLIER...KRA PIN
/*
-Manually verify supplier by admin
-later to automate
-notify supplier of verification

+company:
-admins manually
-admin verify manually
*/
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      companyId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
    return User;
  };