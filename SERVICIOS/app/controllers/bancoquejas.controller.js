const BancoQuejas = require("../models/bancoquejas.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Queja
  const bancoquejas = new BancoQuejas({
    codigotipoqueja:req.body.codigotipoqueja,
    medioingreso:req.body.primernombre,
    detallequeja:req.body.detallequeja,
    estado:req.body.estado,
    fechaingreso:req.body.fechaingreso,
    fechamodifico:req.body.fechamodifico,
    usuarioingreso:req.body.usuarioingreso,
    usuariomodifico:req.body.usuariomodifico,
    usuarioasignado:req.body.usuarioasignado,
    fechaatencion:req.body.fechaatencion
  });

  // Save Customer in the database
  BancoQuejas.create(bancoquejas, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Catalogo."
      });
    else res.send(data);
  });
};

// Retrieve all Catalogo from the database.
exports.findAll = (req, res) => {
    BancoQuejas.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    BancoQuejas.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Queja with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  BancoQuejas.updateById(
    req.params.id,
    new BancoQuejas (req.body),
    (err, data) => {
      console.log('dataaaaaaa',data);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

