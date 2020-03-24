const Catalogo = require("../models/catalogo.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Catalogo
  const catalogo = new Catalogo({
    nombre: req.body.nombre,
    estado: req.body.estado
  });

  // Save Customer in the database
  Catalogo.create(catalogo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "SOome error occurred while creating the Catalogo."
      });
    else res.send(data);
  });
};

// Retrieve all Catalogo from the database.
exports.findAll = (req, res) => {
  Catalogo.getAll((err, data) => {
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
  Catalogo.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Catalogo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Catalogo with id " + req.params.id
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

  Catalogo.updateById(
    req.params.id,
    new Catalogo(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Catalogo with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Catalogo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

