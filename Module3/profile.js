const sql = require("../config/connection.js");
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UpdateProfile = function(account) {
    this.username = account.username;
};
UpdateProfile.updateById = (id, data, result) => {
    sql.query(
        "UPDATE users SET username = ?  WHERE id = ?", [data.username, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Updated user with id: ", id);
            result(null, res);
        });
};
module.exports=UpdateProfile;