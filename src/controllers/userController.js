const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/usersDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const userController = {
// Create - Form to create
create: (req, res,next) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
        res.render("user-crete-form")
        } else {
            res.render('user-crete-form', { errors: errors.mapped(), old: req.body });
        }
        }
    
}

module.exports = userController