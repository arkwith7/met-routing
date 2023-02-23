const db = require("../models");
const User = db.users;
const bcrypt = require('bcryptjs');
const Role = require('../config/role');
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');


// Retrieve all Users from the database.
exports.getAll = (req, res) => {
  
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });

}

// Find a single User with an id
exports.getById = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };
  

// Create and Save a new User
exports.create = (req, res) => {
    // validate
    if (User.findOne({ where: { email: req.body.email } })) {
        throw 'Email "' + req.body.email + '" is already registered';
    }

    const user = new User(req.body);
    
    // hash password
    user.passwordHash = bcrypt.hash(req.body.password, 10);

    // Save Tutorial in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };
  
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const user = User.findByPk(id);
    if (!user) throw 'User not found';

    // validate
    const emailChanged = req.params.email && user.email !== req.params.email;
    if (emailChanged && User.findOne({ where: { email: req.params.email } })) {
        throw 'Email "' + req.params.email + '" is already registered';
    }

    // hash password if it was entered
    if (req.params.password) {
        req.params.passwordHash = bcrypt.hash(req.params.password, 10);
    }

    // copy params to user and save
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
};
  
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    const user = User.findByPk(id);
    if (!user) throw 'User not found';
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
};
  
// schema functions

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

exports.updateSchema = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.User).empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
