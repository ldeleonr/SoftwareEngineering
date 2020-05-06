module.exports = app => {
    const puntosatencion = require("../controllers/puntoatencion.controller.js");

    app.post("/puntoatencion/save", puntosatencion.create);

    app.put("/puntoatencion/:id", puntosatencion.update);

    app.get("/puntoatencion", puntosatencion.findAll);
};
