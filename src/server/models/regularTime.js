var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id_employee:{type:String, required: true},
    
    startWork:{type:String},
    finishWork:{type:String}
});

exports.regularTime = mongoose.model('regularTime', schema);
