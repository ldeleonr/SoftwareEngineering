const Rol = require("../models/roles.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Rol
  const rol = new Rol({
    idrol:req.body.idrol,
    iduser:req.body.iduser,
    estado:req.body.estado
  });

  // Save Customer in the database
  Rol.create(rol, (err, data) => {
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
  Rol.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rol."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Rol.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rol with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Rol with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Find a rol by user ------------
exports.findRolByUser = (req, res) => {
  Rol.findByUser(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rol for User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Rol with id " + req.params.id
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

  Rol.updateById(
    req.params.id,
    new Rol (req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rol with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating rol with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

