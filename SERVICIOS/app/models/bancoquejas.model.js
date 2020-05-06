const sql = require("./db.js");

// constructor
const BancoQuejas = function(bancoquejas) {
    this.id=0;
    this.codigotipoqueja= bancoquejas.codigotipoqueja;
    this.medioingreso=bancoquejas.medioingreso;
    this.detallequeja=bancoquejas.detallequeja;
    this.estado=bancoquejas.estado;
    this.fechaingreso=bancoquejas.fechaingreso;
    this.fechamodifico=bancoquejas.fechamodifico;
    this.usuarioingreso=bancoquejas.usuarioingreso;
    this.usuariomodifico=bancoquejas.usuariomodifico;
    this.usuarioasignado=bancoquejas.usuarioasignado;
    this.fechaatencion=bancoquejas.fechaatencion;
};

BancoQuejas.create = (newQuejaBanco, result) => {
  sql.query("INSERT INTO banco_quejas SET ?", newQuejaBanco, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newQuejaBanco.id=res.insertId;
    console.log("created Queja: ", { id: res,newQuejaBanco });
    result(null, { id: res.insertId, ...newQuejaBanco });
  });
};

BancoQuejas.findById = (quejaID, result) => {
  sql.query(`SELECT * FROM banco_quejas WHERE id = ${quejaID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found queja: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Catalogo with the id
    result({ kind: "not_found" }, null);
  });
};

BancoQuejas.getAll = result => {
  sql.query("SELECT * FROM banco_quejas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("banco quejas : ", res);
    result(null, res);
  });
};

BancoQuejas.updateById = (id, bancoquejas, result) => {
  sql.query(
    "UPDATE banco_quejas SET codigotipoqueja = ?, medioingreso=?, detallequeja=?, estado=?, fechaingreso=?, fechamodifico=?, usuarioingreso=?, usuariomodifico=?, usuarioasignado=?, fechaatencion=? WHERE id = ?",
    [bancoquejas.codigotipoqueja, bancoquejas.medioingreso, bancoquejas.detallequeja, bancoquejas.estado, bancoquejas.fechaingreso,bancoquejas.fechamodifico,bancoquejas.usuarioingreso, bancoquejas.usuariomodifico,bancoquejas.usuarioasignado,bancoquejas.fechaatencion, id],
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
      bancoquejas.id=id;
      console.log("updated queja: ", { id: id, ...bancoquejas });
      result(null, { id: id, ...bancoquejas });
    }
  );
};

module.exports = BancoQuejas;
