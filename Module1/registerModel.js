const sql = require("../config/connection.js");
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Register = function(account) {
    this.username = account.username;
    this.password = account.password;
    this.role = account.role.toLowerCase()=='admin'?'admin':'user';
    this.authenticated_status = account.role.toLowerCase()=='admin'?1:0;
};
//Create New Account With Role User.
Register.create = (newAccount, result) => {
    console.log(newAccount);
    sql.query("INSERT INTO users SET ?", newAccount, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else{
            result(null, { id: res.insertId, ...newAccount });
        }
    });
};
module.exports = Register;