const sql = require("../config/connection.js");
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const approval = function(account) {
    this.authenticated_status = account.status;
};
approval.updateById = (id, data, result) => {
    sql.query(
        "UPDATE users SET authenticated_status = ? WHERE id = ?", [data.authenticated_status, id],
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
module.exports=approval;