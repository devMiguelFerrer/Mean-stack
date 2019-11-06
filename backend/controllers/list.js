const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const asyncHandler = require('../middlewares/asynHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const UserModel = require('../models/User');

/**
 * @description GET ALL USERS
 * @route       GET /list
 * @access      Public
 */
exports.listUsers = asyncHandler(async (req, res, next) => {
  const listUsers = await User.find();
  return res.json({
    success: true,
    data: listUsers
  });
});

/**
 * @description ADD SINGLE USER
 * @route       POST /create
 * @access      Public (Should be private)
 */
exports.addUser = asyncHandler(async (req, res, next) => {
  await User.create(req.body);
  res.json({
    success: true,
    data: req.body
  });
});

/**
 * @description DELETE A USER
 * @route       DELETE /:id
 * @access      Public (Should be private)
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse('No se ha encontrado el Recurso', 404));
  }
  user.remove();
  res.json({
    success: true,
    message: 'Recurso borrado'
  });
});

/**
 * @description UPDATE A USER
 * @route PUT /:id
 * @access Public (Should be private)
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  console.log(user);
  if (!user) {
    return next(new ErrorResponse('No se ha encontrado el Recurso', 404));
  }
  res.json({
    success: true,
    message: 'Usuario actualizado'
  });
});

/**
 * @description RESET USERs DB
 * @route DELETE /
 * @access Public (Should be private)
 */
exports.resetUserDB = asyncHandler(async (req, res, next) => {
  if (req.params.miguel === 'dev') {
    const usersJson = JSON.parse(
      fs.readFileSync(
        path.resolve(`${__dirname}`, `../config/users.json`),
        'utf-8'
      )
    );

    await UserModel.deleteMany();
    console.log('Data destroyed...');

    await UserModel.create(usersJson);
    console.log('Data imported...');

    res.json({
      success: true,
      message: 'Base de datos reseteada'
    });
  } else {
    res.json({
      success: false,
      message: 'No se ha podido resetear la base de datos'
    });
  }
});
