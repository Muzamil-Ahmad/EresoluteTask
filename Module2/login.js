const Account = require("../Module1/loginModel.js");
const Register = require("../Module1/registerModel.js");
const users = require("./model.js");
const bcrypt = require('bcrypt');
const auth = require("../middleware/middleware.js");
const approval = require("./Approve.js");
const UpdateProfile = require("../Module3/profile.js");

// Create and Save a new Account
exports.create = (req, res) => {
    // Validate request
    var salt = bcrypt.genSaltSync(10);
     var hash = bcrypt.hashSync(req.body.password, salt);
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Account
    const newAccount = new Register({
        username: req.body.username,
        password: hash,
        role:req.body.role
    });
    // Save User in the database
    Register.create(newAccount, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Post."
            });
        else
        {
            res.send(data);
        } 
    });
};
// Login with valid credentials.
exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const login = new Account({
        username: req.body.username,
        password: req.body.password
    });

    Account.authenticateCredentials(login, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Post."
            });
        else 
        {
            res.header('x-auth-token',data.token).send(data);
        }
    });
};

// Retrieve all Users from the database .
exports.get = (req, res) => {
  users.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        else res.send(data);
    });
};
// Update the status of the user
exports.ApproveUser = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const update = new approval({
        status: req.body.status
    });
    approval.updateById(
        req.params.id,update,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Update user details
exports.UpdateProfile = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const update = new UpdateProfile({
        username: req.body.username
    });
    UpdateProfile.updateById(
        req.params.id,update,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};



