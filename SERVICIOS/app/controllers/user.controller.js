const User = require("../models/user.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    dpi:req.body.dpi,
    primernombre:req.body.primernombre,
    segundonombre:req.body.segundonombre,
    cargo:req.body.cargo,
    primerapellido:req.body.primerapellido,
    segundoapellido:req.body.segundoapellido,
    email:req.body.email,
    usuario:req.body.usuario,
    estado:req.body.estado,
    codigopuntoasignado:req.body.codigopuntoasignado,
    password : req.body.password
  });

  // Save Customer in the database
  User.create(user, (err, data) => {
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
  User.getAll((err, data) => {
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
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

//login method
exports.findLogin = (req, res) => {
 // console.log("se le envia estoooooo", req.body.usuario);
 var resp ={
  respuesta:true,
  id:null
  };
 User.findByLogin(req.body.usuario,req.body.password, (err, data) => {
   //console.log('ESTO RETORNA',data.id);
   resp.respuesta=false;
   if(data!=null){
    if(data.usuario===req.body.usuario && data.password===req.body.password){
      console.log('login', 'OK');
      resp.respuesta=true;
      resp.id=data.id;
    }
  }
    if (err) {
      if (err.kind === "not_found") {
        resp.respuesta=false;
        res.status(200).send(resp);
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.user
        });
      }
    } else res.send(resp);
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


  User.updateById(
    req.params.id,
    new User (req.body),
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

