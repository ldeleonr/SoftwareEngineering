const sql = require("./db.js");

// constructor
const User = function(user) {
    this.id=0;
    this.dpi= user.dpi;
    this.primernombre=user.primernombre;
    this.segundonombre=user.segundonombre;
    this.cargo=user.cargo;
    this.primerapellido=user.primerapellido;
    this.segundoapellido=user.segundoapellido;
    this.email=user.email;
    this.usuario=user.usuario;
    this.estado=user.estado;
    this.codigopuntoasignado=user.codigopuntoasignado;
    this.password=user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO banco_users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newUser.id=res.insertId;
    console.log("created user: ", { id: res,newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userID, result) => {
  sql.query(`SELECT * FROM banco_users WHERE id = ${userID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Catalogo with the id
    result({ kind: "not_found" }, null);
  });
};

//find by login
User.findByLogin = (userID,password, result) => {
  sql.query(`SELECT * FROM banco_users WHERE usuario = '${userID}' and password= '${password}'`, (err, res) => {
 //  console.log('OBTENIDO',res);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return null;
    }

    if (res.length) {
     // console.log("found user: ", res[0]);
      result(null, res[0]);
      return res[0];
    }

    // not found Catalogo with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM banco_users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("banco_users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE banco_users SET dpi = ?, primernombre=?, segundonombre=?, cargo=?, primerapellido=?, segundoapellido=?, email=?, usuario=?, estado=?, codigopuntoasignado=?, password=? WHERE id = ?",
    [user.dpi, user.primernombre, user.segundonombre, user.cargo,user.primerapellido, user.segundoapellido,user.email, user.usuario, user.estado, user.codigopuntoasignado, user.password, id],
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
      user.id=id;
      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

module.exports = User;
