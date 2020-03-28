module.exports = app => {
    const users = require("../controllers/user.controller.js");

    app.post("/users", users.create);

    app.put("/users/:id", users.update);

    app.post("/users/authenticate",users.findLogin);

    app.get("/users",users.findAll);
};