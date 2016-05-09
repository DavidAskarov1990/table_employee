var Employee = require('../controller/employee');
var User = require('../controller/user');

module.exports = function (app) {
  app.get('/' , require('./home').get);

  app.get('/api/getEmployees/', Employee.getAllEmployees);
  app.get('/api/regular-time/:id', Employee.getRegularTime);
  app.post('/api/newEmployee/', Employee.addEmployee);
  app.post('/api/edit/', Employee.edit);
  app.post('/api/delete/:id', Employee.deleteEmployee);

  app.post('/api/registration/', User.registrationUser);
  app.post('/api/authorization/', User.authorizationUser);
};
