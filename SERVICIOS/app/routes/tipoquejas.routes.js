module.exports = app => {
    const tipoqueja = require("../controllers/tipoquejas.controller.js");

    app.post("/tipoquejas/save", tipoqueja.create);

    app.put("/tipoquejas/:id", tipoqueja.update);

    app.get("/tipoquejas", tipoqueja.findAll);
};