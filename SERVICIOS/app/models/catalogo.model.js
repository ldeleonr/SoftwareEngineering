const sql = require("./db.js");

// constructor
const Catalogo = function(catalogo) {
  this.codigopadre = 0;
  this.nombre = catalogo.nombre;
  this.estado=catalogo.estado;
};

Catalogo.create = (newCatalogo, result) => {
  sql.query("INSERT INTO catalogopadre SET ?", newCatalogo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newCatalogo.id=res.insertId;
    console.log("created catalogo: ", { id: res,newCatalogo });
    result(null, { id: res.insertId, ...newCatalogo });
  });
};

Catalogo.findById = (catalogoId, result) => {
  sql.query(`SELECT * FROM catalogopadre WHERE id = ${catalogoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found catalogo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Catalogo with the id
    result({ kind: "not_found" }, null);
  });
};

Catalogo.getAll = result => {
  sql.query("SELECT * FROM catalogopadre", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("catalogo: ", res);
    result(null, res);
  });
};

Catalogo.updateById = (id, catalogo, result) => {
  sql.query(
    "UPDATE catalogopadre SET nombre = ? WHERE id = ?",
    [catalogo.nombre, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated catalogo: ", { id: id, ...catalogo });
      result(null, { id: id, ...catalogo });
    }
  );
};

module.exports = Catalogo;
