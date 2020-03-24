const sql = require("./db.js");

// constructor
const Rol = function(rol) {
    this.id=0;
    this.idrol=rol.idrol;
    this.iduser=rol.iduser;
    this.estado=rol.estado;
};

Rol.create = (newRol, result) => {
  sql.query("INSERT INTO banco_roles SET ?", newRol, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newRol.id=res.insertId;
    console.log("created user: ", { id: res,newRol });
    result(null, { id: res.insertId, ...newRol });
  });
};

Rol.findById = (rolID, result) => {
  sql.query(`SELECT * FROM banco_users WHERE id = ${rolID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found rol: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Catalogo with the id
    result({ kind: "not_found" }, null);
  });
};
Rol.findByUser = (rolID, result) => {
  sql.query(`select cdp.codigodato,cdp.nombre from banco_roles br 
  inner join catalogobydatopadre cdp on br.idrol=cdp.codigodato where iduser=${rolID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found rol: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Catalogo with the id
    result({ kind: "not_found" }, null);
  });
};

Rol.getAll = result => {
  sql.query("SELECT * FROM banco_roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("banco_roles: ", res);
    result(null, res);
  });
};

Rol.updateById = (id, rol, result) => {
  sql.query(
    "UPDATE banco_users SET idrol = ?, iduser=?, estado=?  WHERE id = ?",
    [ rol.idrol,rol.iduser,rol.estado, id],
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

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

module.exports = Rol;
