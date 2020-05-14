const sql = require("../config/connection.js");
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = function(account) {
    this.username = account.username;
    this.password = account.password;
};
//Sign in 
Account.authenticateCredentials = (credentials, result) => {
    let sqlQuery="SELECT id, username, password,role,authenticated_status FROM users WHERE username= '"+credentials.username+"'";
     sql.query(sqlQuery, (err, res) => {
        if (err) {
                result(null, { id: "Some error"});
        }else{
            if(res.length >0){
                var data=res;
                    bcrypt.compare(credentials.password, res[0].password, function(err, res) {
                        if(res)
                        {
                            if(data[0].role=='user' && data[0].authenticated_status==1)
                            {
                                const token = jwt.sign({ id: data[0].id, username: data[0].username,role:data[0].role }, 'Muzamil123'); // Muzamil123 is temporary jwt Private Key,best pratice is to store it in env file
                                result(null, { id: res.id, token});
                            }else if(data[0].role=='admin' && data[0].authenticated_status==1)
                            {
                                const token = jwt.sign({ id:data[0].id, username: data[0].username,role:data[0].role }, 'Muzamil123'); // Muzamil123 is temporary jwt Private Key,best pratice is to store it in env file
                                
                                result(null, { id: res.id, token});
                            }else if(data[0].role=='user' && data[0].authenticated_status==0)
                            {
                               result(null, { message: "Your account has not been approved by admin", ...credentials});
                            }
                            else if(data[0].role=='user' && data[0].authenticated_status==2)
                            {
                               result(null, { message: "Your account is rejected", ...credentials});
                            }
                            else{
                                result(null, { message: "credentials does not match", ...credentials});
                            }
                            
                        } 
                        else{
                            result(null, { message: "credentials not match in our records", ...credentials});
                        }
                    });
             }else{
                    result(null, { message: "Not exist"});
              }
           
        }
    });
};
module.exports = Account;