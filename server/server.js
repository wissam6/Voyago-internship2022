const sql = require('mssql/msnodesqlv8');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

let config = {
    database: 'AdventureWorks',
    server: 'NBSOFMERHI',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

app.listen(5000, function () {
    console.log('Server is running..');
});

app.post('/login', (req, res) => {
    let email = req.body.dataItem.email;
    let password = req.body.dataItem.password;
    sql.connect(config, (err) => {
        if (err) console.log(err);
        let checkLogin = new sql.Request();
        checkLogin.query("SELECT FirstName from Person.Contact WHERE EmailAddress= '" + email + "' AND PasswordHash='" + password + "' ", (err, recordSet) => {
            if (err) console.log(err);
            else {
                res.json(recordSet.recordsets[0][0]);
            }
        })
    })
})

app.post('/register', (req, res) => {
    let name = req.body.dataItem.name;
    const names = name.split(' ');
    let firstName = names[0];
    let lastName = names[1];
    let email = req.body.dataItem.email;
    let password = req.body.dataItem.password;
    sql.connect(config, (err) => {
        if (err) console.log(err);

        //insert
        let checkRegister = new sql.Request();
        checkRegister.query("INSERT INTO Person.Contact (FirstName, LastName, EmailAddress, PasswordHash, PasswordSalt) VALUES ('" + firstName + "','" + lastName + "', '" + email + "', '" + password + "', 'i2U3DxA=')", (err, recordSet) => {
            if (err) {
                console.log(err);
                res.send();
            }
            else {
                console.log('inserted');
                res.send();
            }
        })
    })
})

app.post('/allproducts', (req, res) => {
    const category = req.body.category;
    const sqlQuery = "SELECT DISTINCT subCategory.Name as categoryName, product.productModelID, model.Name as modelName, product.ProductID, product.Name, product.ProductNumber, product.Color, product.Size, product.Weight, product.ListPrice, photo.LargePhoto FROM Production.Product as product, Production.ProductModel as model, Production.ProductProductPhoto as productphoto, Production.ProductPhoto as photo, Production.ProductReview as review, production.ProductSubcategory as subCategory WHERE productphoto.ProductPhotoID=photo.ProductPhotoID AND product.ProductID = productphoto.ProductID AND model.ProductModelID = product.ProductModelID AND subCategory.Name='"+category+"' AND product.ProductSubcategoryID=subCategory.ProductSubcategoryID ORDER BY product.Name DESC";
    sql.connect(config, (err) => {
        if (err) console.log(err);
        let getProducts = new sql.Request();
        getProducts.query(sqlQuery, (err, recordSet) => {
            if (err) console.log(err);
            else {
                res.json(recordSet);
                console.log(recordSet);
            }
        })
    })
})

app.post('/similar', (req, res) => {
    let id = req.body.id;
    console.log(id);
    let sqlQuery = "SELECT TOP 4 product.ProductModelID,product.Size,product.Color,product.Weight,product.ProductNumber,product.Name, product.ListPrice, product.ProductID from Production.Product as product WHERE product.ProductModelID='"+id+"' ";
    sql.connect(config, (err) => {
        if (err) console.log(err);
        let similarProducts = new sql.Request();
        similarProducts.query(sqlQuery, (err, recordSet) => {
            if (err) console.log(err);
            else {
                res.json(recordSet);
            }
        })
    })
})

app.post('/viewAllProducts', (req, res) => {
    //const sqlQuery = "SELECT product.ProductSubcategoryID ,model.Name as modelName, product.ProductID, product.Name, product.ProductNumber, product.Color, product.Size, product.Weight, product.ListPrice, photo.LargePhotoFileName FROM Production.Product as product, Production.ProductModel as model, Production.ProductProductPhoto as productphoto, Production.ProductPhoto as photo, Production.ProductReview as review WHERE productphoto.ProductPhotoID=photo.ProductPhotoID AND product.ProductID = productphoto.ProductID AND model.ProductModelID = product.ProductModelID";
    const sqlQuery = "SELECT product.productSubcategoryID ,product.productModelID, model.Name as modelName, product.ProductID, product.Name, product.ProductNumber, product.Color, product.Size, product.Weight, product.ListPrice, photo.LargePhoto FROM Production.Product as product, Production.ProductModel as model, Production.ProductProductPhoto as productphoto, Production.ProductPhoto as photo, Production.ProductReview as review, production.ProductSubcategory as subCategory WHERE productphoto.ProductPhotoID=photo.ProductPhotoID AND product.ProductID = productphoto.ProductID AND model.ProductModelID = product.ProductModelID AND product.ProductSubcategoryID=subCategory.ProductSubcategoryID ORDER BY product.Name DESC";
    sql.connect(config, (err) => {
        if (err) console.log(err);
        let getProducts = new sql.Request();
        getProducts.query(sqlQuery, (err, recordSet) => {
            if (err) console.log(err);
            else {
                res.json(recordSet);
                console.log(recordSet);
            }
        })
    })
})

app.post('/description', (req,res)=> {
    const id = req.body.id;
    const sqlQuery = "SELECT description.Description FROM Production.Product, Production.ProductDescription as description, Production.ProductModelProductDescriptionCulture as culture WHERE product.ProductID='"+id+"' AND product.ProductModelID=culture.ProductModelID AND culture.ProductDescriptionID=description.ProductDescriptionID";
    sql.connect(config, (err) => {
        if (err) console.log(err);
        let getDescription = new sql.Request();
        getDescription.query(sqlQuery, (err, recordSet) => {
            if (err) console.log(err);
            else {
                res.json(recordSet);
                console.log(recordSet);
            }
        })
    })
})

