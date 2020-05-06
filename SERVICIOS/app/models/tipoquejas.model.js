const sql = require("./db.js");

// constructor
const TipoQuejas = function(tipoquejas) {
  this.id=0;
  this.siglas=tipoquejas.siglas;
  this.anio=tipoquejas.anio;
  this.descripcion=tipoquejas.descripcion;
};

TipoQuejas.create = (newTipoQuejas, result) => {
  sql.query("INSERT INTO tipo_quejas SET ?", newTipoQuejas, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newTipoQuejas.id=res.insertId;
    console.log("created tipoqueja: ", { id: res,newTipoQuejas });
    result(null, { id: res.insertId, ...newTipoQuejas });
  });
};

TipoQuejas.findById = (tipoQuejaID, result) => {
  sql.query(`SELECT * FROM tipo_quejas WHERE id = ${tipoQuejaID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tipo de quejas: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Catalogo with the id
    result({ kind: "not_found" }, null);
  });
};

TipoQuejas.getAll = result => {
  sql.query("SELECT * FROM tipo_quejas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipo quejas  ", res);
    result(null, res);
  });
};

TipoQuejas.updateById = (id, tipoqueja, result) => {
  sql.query(
    "UPDATE tipo_quejas SET siglas = ?, anio=?, descripcion=? WHERE id = ?",
    [tipoqueja.siglas, tipoqueja.anio, tipoqueja.descripcion, id],
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

      console.log("updated tipo queja: ", { id: id, ...tipoqueja });
      result(null, { id: id, ...tipoqueja });
    }
  );
};

module.exports = TipoQuejas;
