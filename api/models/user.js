// MySQL
const sql = require('../models/sql.js');

class User{
    constructor(obj){
        this.ID = obj.ID;
        this.Username = obj.Username;
        this.Password = obj.Password;
        this.Email = obj.Email;
        this.DateRegistered = obj.DateRegistered;
        this.LastLoggedInDate = obj.LastLoggedInDate;
        this.Avatar = obj.Avatar;
    }

    ToDBObject(){
        return {
            "ID": this.ID,
            "Username": this.Username,
            "Password": this.Password,
            "Email": this.Email,
            "DateRegistered": this.DateRegistered,
            "LastLoggedInDate": this.LastLoggedInDate,
            "Avatar": this.Avatar,
        }
    }
}

User.getUser = function(userId) {
    return new Promise(function(success, fail) {
        sql.query("SELECT * FROM users WHERE ID = ?", userId, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                var user = new User(res[0]);
                success(user);
            }
        });
    });
};

User.getUserByEmail = function(email) {
    return new Promise(function(success, fail) {
        sql.query("SELECT * FROM users WHERE Email = ?", email, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                var user = new User(res[0]);
                success(user);
            }
        });
    });
};

User.createUser = function(user) {
    return new Promise(function(success, fail) {
        sql.query("INSERT INTO users set ?", user.ToDBObject(), function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                success(res.insertId);
            }
        });
    });
};

User.updateUser = function(user) {
    return new Promise(function(success, fail) {
        sql.query("UPDATE users set ?", user.ToDBObject(), function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                success(res.insertId);
            }
        });
    });
};

/*User.login = function(user, callback) {
    sql.query("SELECT 1 FROM users WHERE username = ? AND password = ?", [username, password], function(err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        else {
            callback(null, res.insertId);
        }
    });
}*/

module.exports = User;