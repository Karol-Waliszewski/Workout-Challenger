module.exports = function(app) {
  app.use(expressValidator());
  const controller = require('../controllers/userController');

  // todoList Routes
  app.route('/:token')
    .get(controller.list_all);

  app.route('/')
    .post(controller.regiter)
    .put(controller.update);
};
