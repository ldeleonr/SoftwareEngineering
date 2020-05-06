module.exports = app => {
    const bancoquejas = require("../controllers/bancoquejas.controller.js");

    app.post("/bancoquejas", bancoquejas.create);

    app.put("/bancoquejas/:id", bancoquejas.update);

    app.get("/bancoquejas",bancoquejas.findAll);
};