const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const busqueda = req.params.id
		const producto = products.find( element => element.id == busqueda)
		res.render("detail", {producto,products})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form",{products})
	},
	
	// Create -  Method to store
	store:(req,res,next)=>{
			const files = req.files;
			const filename = files.map(file => file.filename)
			const json = fs.readFileSync(path.join(__dirname, "../data/productsDataBase.json"), "utf-8");
			const products = JSON.parse(json);
			  
			if (!files || !files.length){
		   return res.status(400).send('Por favor seleccione un archivo');
			 }else{
		const {name,price,discount,category,description} = req.body
		const lastProduct = products[products.length - 1];
		const newId = lastProduct ? lastProduct.id + 1 : 1;
		const newProduct = {
			id: newId,
			name: name.trim(),
			price: price.trim(),
			discount: discount.trim(),
			category: category.trim(),
			description: description.trim(),
			image: filename,
		}
	
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
		 res.redirect('/products');
	}},

	// Update - Form to edit
	edit: (req, res) => {
		const busqueda = req.params.id
		let producto = products.find( element => element.id == busqueda)
		res.render("product-edit-form",{products,producto})
	},
	// Update - Method to update
	update: (req, res) => {
		const {name,price,discount,category,description} = req.body
		const id = req.params.id
		let producte = products.map(element => {
			if (element.id == id){
				return  {
					id: element.id,
					name: name.trim(),
					price: price.trim(),
					discount : discount.trim(),
					category : category.trim(),
					description : description.trim(),
					image : element.image
				}
			}return element 
		})
		let productjson = JSON.stringify(producte);
		fs.writeFileSync(productsFilePath,productjson,"utf-8");
		res.redirect("/products/"+id)
		},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const idProducto = req.params.id;
		let producto = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const nuevosProductos = productos.filter(producto => producto.id !== idProducto);

		
		fs.writeFileSync(productsFilePath, JSON.stringify(nuevosProductos));
	
		
		res.redirect('/products');
	}
};

module.exports = controller;