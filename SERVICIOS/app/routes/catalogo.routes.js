module.exports = app => {
    const catalogos = require("../controllers/catalogo.controller.js");

    app.post("/catalogos", catalogos.create);

    app.put("/catalogos/:id", catalogos.update);
};