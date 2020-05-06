const TipoQueja = require("../models/tipoquejas.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a tipo de quejas
  const tipoqueja = new TipoQueja({
    siglas: req.body.siglas,
    anio: req.body.anio,
    descripcion: req.body.descripcion
  });

  // Save Tipo de queja in the database
  TipoQueja.create(tipoqueja, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tipo de queja."
      });
    else res.send(data);
  });
};

// Retrieve all Catalogo from the database.
exports.findAll = (req, res) => {
    TipoQueja.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving catalogo."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    TipoQueja.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tipo de queja with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tipo de quejas with id " + req.params.id
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

  console.log(req.body);

  TipoQueja.updateById(
    req.params.id,
    new TipoQueja(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found PuntoAtencion with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating PuntoAtencion with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

