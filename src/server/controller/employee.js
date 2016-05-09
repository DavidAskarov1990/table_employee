var Employee = require('../models/employee').Employee;
var RegularTime = require('../models/regularTime').regularTime;

exports.getAllEmployees = function (req, res, next) {
    Employee.find({}, function (err, goods) {
        if(err) return next(err);
        res.json(goods);
    });
};

exports.addEmployee = function (req, res, next)
{
    var fullName = req.body.params.fullName;
    var sex = req.body.params.sex;
    var contactInformation = req.body.params.contactInformation;

    var employee = new Employee({fullName:fullName, sex:sex, contactInformation:contactInformation});
    employee.save(function (err) 
    {
        if(err) return next(err);
        res.json(employee);
    });
};

exports.getRegularTime = function (req, res, next)
{
    RegularTime.find({id_employee:req.params.id}, function (err, regular) {
        if(err) return next(err);
        if(regular == null)
        {
            res.send('None');
            return;
        }
        res.json(regular);
    });
};

exports.edit = function (req, res, next) 
{
    RegularTime.findOne({id_employee:req.body.params.regular.id_employee} , function (err, regular) {
        var regularTimeEmployee = new RegularTime(req.body.params.regular);

        if(regular == null){
            regularTimeEmployee.save(function (err)
            {
                if(err) return next(err);
                res.send('Редактирование выполнено');
            })
        }
        else{
            RegularTime.findOneAndUpdate({_id:regular._id}, req.body.params.regular, function (err, result) {
                if(err) return next(err);
                res.send('Редактирование выполнено');
            })
        }
    });
    
    Employee.findOne({_id:req.body.params.regular.id_employee}, function (err, regular) {
        var employee = new Employee(req.body.params.employee);

        if(regular == null){
            employee.save(function (err)
            {
                if(err) return next(err);
            })
        }
        else{
            Employee.findOneAndUpdate({_id:regular._id}, req.body.params.employee, function (err, result) {
                if(err) return next(err);
            })
        }
    });
};

exports.deleteEmployee = function (req, res, next)
{
    Employee.findOne({_id:req.params.id}, function (err, employee) {
        if(err) return next(err);

        if(employee!=null){
            employee.remove();
            res.send('delete');
        }
    });
};