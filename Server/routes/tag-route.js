//routes
module.exports = function(app) {
  const controller = require('../controllers/tagController');

  // todoList Routes
  app.route('/:type/:token')
    .get(controller.list_all);
};
