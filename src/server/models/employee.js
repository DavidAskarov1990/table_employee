var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    fullName:{type:String, required: true},
    sex:{type:String, required: true},
    contactInformation:{type:String},
    dateAdded: {type: Date, default: Date.now}
});

exports.Employee = mongoose.model('Employee', schema);