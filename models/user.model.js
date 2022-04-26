//TODO: VERIFY SUPPLIER...KRA PIN
/*
-user model used by both suppliers and contracting authories plus zabuni admin
-for contracting authorities, they have admin(isAdmin) and other staff.
-

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
      verified: {
        type: Sequelize.BOOLEAN
      },
      companyId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lastLogin: {
        type: Sequelize.DATE
      }, 
    });
    return User;
  };