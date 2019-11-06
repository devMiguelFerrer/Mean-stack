const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    require: true,
    type: String,
    maxlength: 50
  },
  age: {
    require: true,
    type: Number,
    max: [99, 'Se ha superado el limite de la edad (99)']
  },
  email: {
    type: String,
    required: [true, 'Por favor añada un email'],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Por favor introzca un email valido'
    ],
    maxlength: 50
  },
  desc: {
    require: true,
    type: String,
    maxlength: 150
  }
});

module.exports = mongoose.model('User', UserSchema);
