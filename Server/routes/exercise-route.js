//route
module.exports = function(app) {
  const controller = require('../controllers/exerciseController');

  // todoList Routes
  app.route('/:token')
    .get(controller.list_all);

  app.route('/')
    .post(controller.add)
    .put(controller.update)
    .delete(controller.delete);
};
