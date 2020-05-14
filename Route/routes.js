const auth = require("../middleware/middleware.js");
const isAdmin = require("../middleware/isAdmin.js");

module.exports = app => {
    const users = require("../Module2/login.js");
    // Create a new Account with role user
    app.post("/api/signup", users.create);
    // Sign in with valid credentials
     app.post("/api/signin", users.login);
     //View all users (Admin access).
      app.get("/api/users",auth,isAdmin,users.get);
      //Approve a user (Admin access).
      app.post("/api/users/:id",auth,isAdmin, users.ApproveUser);//update status of the user
      //upate user profile.
      app.post("/api/updateuser/:id",auth, users.UpdateProfile);//update username of user
};