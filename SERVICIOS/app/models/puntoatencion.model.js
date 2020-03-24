const sql = require("./db.js");

// constructor
const PuntoAtencion = function(puntoatencion) {
  this.id=0;
  this.nombre=puntoatencion.nombre;
  this.estado=puntoatencion.estado;
  this.codigodepto=puntoatencion.codigodepto;
  this.codigoregion=puntoatencion.codigoregion;
};

PuntoAtencion.create = (newPuntoAtencion, result) => {
  sql.query("INSERT INTO puntosatencion SET ?", newPuntoAtencion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newPuntoAtencion.id=res.insertId;
    console.log("created catalogo: ", { id: res,newPuntoAtencion });
    result(null, { id: res.insertId, ...newPuntoAtencion });
  });
};

PuntoAtencion.findById = (puntoAtencionID, result) => {
  sql.query(`SELECT * FROM puntosatencion WHERE id = ${puntoAtencionID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found punto atencion: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Catalogo with the id
    result({ kind: "not_found" }, null);
  });
};

PuntoAtencion.getAll = result => {
  sql.query("	select id, (select nombre from catalogobydatopadre where codigodato=pac.estado) as 'estado',	(select nombre from catalogobydatopadre where codigodato=codigoregion) as 'region',nombre from puntosatencion pac", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("punto atencion: ", res);
    result(null, res);
  });
};

PuntoAtencion.updateById = (id, puntoatencion, result) => {
  sql.query(
    "UPDATE puntosatencion SET nombre = ?, estado=?, codigodepto=?, codigoregion=? WHERE id = ?",
    [puntoatencion.nombre, puntoatencion.estado, puntoatencion.codigodepto, puntoatencion.codigoregion, id],
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

      console.log("updated punto atencion: ", { id: id, ...puntoatencion });
      result(null, { id: id, ...puntoatencion });
    }
  );
};

module.exports = PuntoAtencion;
