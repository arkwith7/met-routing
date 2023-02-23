module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Retrieve all users
  router.get("/", users.getAll);

  // Retrieve a single user with id
  router.get("/:id", users.getById);

  // Create a new user
  router.post("/", user.createSchema, users.create);

  // Update a user with id
  router.put("/:id", user.updateSchema, users.update);

  // Delete a user with id
  router.delete("/:id", users.delete);

  app.use('/api/users', router);
};

// // routes

// router.get('/', getAll);
// router.get('/:id', getById);
// router.post('/', createSchema, create);
// router.put('/:id', updateSchema, update);
// router.delete('/:id', _delete);

// module.exports = router;