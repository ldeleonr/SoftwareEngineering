const sql = require("./db.js");

// constructor
const CatalogobyDato = function(catalogobydato) {
  this.codigodato = 0;
  this.codigopadre=catalogobydato.codigopadre;
  this.codigohijo= catalogobydato.codigohijo;
  this.nombre= catalogobydato.nombre;
  this.estado=catalogobydato.estado;
};

CatalogobyDato.create = (newCatalogoDato, result) => {
  sql.query("INSERT INTO catalogobydatopadre SET ?", newCatalogoDato, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newCatalogoDato.id=res.insertId;
    newCatalogoDato.codigodato=res.insertId;
    console.log("created catalogo: ", { id: res,newCatalogoDato });
    result(null, { id: newCatalogoDato.insertId, ...newCatalogoDato });
  });
};

CatalogobyDato.findById = (catalogoDatoId, result) => {
  sql.query(`SELECT * FROM catalogobydatopadre WHERE id = ${catalogoDatoId}`, (err, res) => {
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

CatalogobyDato.findByDatoPadre = (datoPadre, result) => {
  sql.query(`SELECT * FROM catalogobydatopadre WHERE codigopadre = ${datoPadre}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found catalogo by catalogo padre: ", res);
      result(res);
      return ;
    }

    // not found Catalogo with the id
    result({ kind: "not_found" }, null);
  });
};


CatalogobyDato.findAllByDatoPadre = (datoPadre,result)=> {
  sql.query(`SELECT * FROM catalogobydatopadre where codigopadre = ${datoPadre}`, (err, res) => {
    //console.log(res.length);
    datos = new Array();
    var i;
    for (i = 0; i < res.length; i++) {
        datos[i]=res[i].nombre;
    }

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

   //
   
   //console.log("catalogo bydato padre : ", res);
   //console.log(datos);
    result( res);
    return (null,result);
  });
};

CatalogobyDato.updateById = (id, catalogodato, result) => {
  sql.query(
    "UPDATE catalogobydatopadre SET codigopadre=?, dato = ?, estatus = ? WHERE id = ?",
    [catalogodato.codigopadre, catalogodato.dato ,catalogodato.estatus, id],
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

      console.log("updated catalogo: ", { id: id, ...catalogodato });
      result(null, { id: id, ...catalogodato });
    }
  );
};

module.exports = CatalogobyDato;
