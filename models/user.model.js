//TODO: VERIFY SUPPLIER...KRA PIN
/*
-Manually verify supplier by admin
-later to automate
-notify supplier of verification

-user model -> holds info for both supplier and CA. 
   -business name
   -email
   -password
   -verified: 
+company:
-admins manually
-admin verify manually
*/
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.BOOLEAN
      },
      companyId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
    return User;
  };