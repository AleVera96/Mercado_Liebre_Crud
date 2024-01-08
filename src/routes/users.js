// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer")
const { check } = require('express-validator');
const validateRegister = [
  check('first_name').notEmpty().withMessage('Debes completar el nombre').bail()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
  check('last_name').notEmpty().withMessage('Debes completar el apellido').bail()
    .isLength({ min: 5 }).withMessage('El apellido debe tener al menos 5 caracteres'),
  check('email').notEmpty().withMessage('Debes completar el email').bail()
    .isEmail().withMessage('Debes ingresar un email válido'),
  check('password').notEmpty().withMessage('Debes completar la contraseña').bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')
];
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dataBase = path.join(__dirname, "../../public/images/users");
      cb(null, dataBase)
    },
    filename:  (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
  })
   
var fileUpload = multer({ storage: storage })
// ************ Controller Require ************
const userController = require('../controllers/userController');

/*** CREATE ONE USER ***/ 
router.get('/createForm', userController.create); 
router.post('/create',validateRegister,userController.create); 


module.exports = router