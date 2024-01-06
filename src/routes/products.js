// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dataBase = path.join(__dirname, "../../public/images/products");
      cb(null, dataBase)
    },
    filename:  (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
  })
   
var fileUpload = multer({ storage: storage })
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create',fileUpload.array("image"), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id/edit', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id/delete', productsController.destroy); 


module.exports = router;
