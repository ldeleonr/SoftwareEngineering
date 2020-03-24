module.exports = app => {
    const roles = require("../controllers/rol.controller.js");

    app.post("/roles", roles.create);

    app.put("/roles/:id", roles.update);

    app.get("/roles/user/:id", roles.findRolByUser);
};