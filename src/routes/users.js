// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer")

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
