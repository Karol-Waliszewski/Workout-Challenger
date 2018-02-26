//route element
module.exports = function(app) {
  const controller = require('../controllers/goalController');

  // todoList Routes
  app.route('/:token')
    .get(controller.find);

  app.route('/')
    .post(controller.add)
    .put(controller.update)
    .delete(controller.delete);
};
