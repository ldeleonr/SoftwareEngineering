module.exports = app => {
    const catalogobydato = require("../controllers/catalogoByDato.controller.js");

    app.post("/catalogobydato", catalogobydato.create);

    app.put("/catalogobydato/:id", catalogobydato.update);

    app.get("/catalogobydato/dato/:id", catalogobydato.findAll);
};