/**
 * Created by Dev on 04.04.2016.
 */

var mongoose = require('../lib/mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;

