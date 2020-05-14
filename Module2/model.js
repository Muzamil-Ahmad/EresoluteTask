const sql = require("../config/connection.js");
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = function(account) {
    this.username = account.username;
    this.password = account.password;
};
users.getAll = result => {
    sql.query("SELECT * FROM users where role='user'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
      
        result(null, res);
    });
};

users.updateById = (id, data, result) => {
    sql.query(
        "UPDATE users SET authenticated_status = ? WHERE id = ?", [data.status, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Post with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted post with id: ", id);
            result(null, res);
        });
};
module.exports = users;
