
const controller = require("../controllers/tutorial.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
            );
        next();
    });

    // Create a new Tutorial
    app.post("/api/tutorials", controller.create);
    // Retrieve all Tutorials
    app.get("/api/tutorials", controller.findAll);
    // Retrieve all published Tutorials
    app.get("/api/tutorials/published", controller.findAllPublished);
    // Retrieve a single Tutorial with id
    app.get("/api/tutorials/:id", controller.findOne);
    // Update a Tutorial with id
    app.put("/api/tutorials/:id", controller.update);
    // Delete a Tutorial with id
    app.delete("/api/tutorials/:id", controller.delete);
    // Delete all Tutorials
    app.delete("/api/tutorials", controller.deleteAll);

};
