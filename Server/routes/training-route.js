//route
module.exports = function(app) {
  const controller = require('../controllers/trainingController');

  // todoList Routes
  app.route('/:token')
    .get(controller.list_all);

  app.route('/')
    .post(controller.add)
    .put(controller.update)
    .delete(controller.delete);
};
