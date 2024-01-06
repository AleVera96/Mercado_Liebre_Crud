const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/usersDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const controller = {
// Create - Form to create
create: (req, res) => {
    res.render("user-create-form",{products})
}
}

module.exports = userController