/**
 * Created by Dev on 08.05.2016.
 */

var User = require('../models/user').User;
var async = require('async');

exports.registrationUser = function (req, res, next)
{
    var userNew = new User({
        username:req.body.params.login,
        password:req.body.params.password
    });

    User.findOne({username:req.body.params.login}, function (err, results) {
        if(err) return err;

        if(results!=null)
        {
            res.end('Логин занят');
        }
        else {
            userNew.save(function (err, user, affected)
            {
                if(err) throw err;

                res.end('Вы успешно зарегестрировались');
            });
        }
    });
};


exports.authorizationUser =  function (req, res, next) {
    var username = req.body.params.login;
    var password = req.body.params.password;

    async.waterfall([
        function (callback) {
            User.findOne({username:username}, callback);
        },
        function (user, callback) {
            if(user)
            {
                if(user.checkPassword(password)){
                    callback(null, user);
                }else
                {
                    res.end('Не верный пароль');
                }
            }
            else
            {
                res.end('Пользователь не найден');
            }
        }
    ], function (err, user) {
        if(err) return next(err);
        req.session.user = user._id;
        res.send(req.session.user);
    });
};