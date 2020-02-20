const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'public/' })
const path = require('path');
const fs = require('fs');

const port = 3000;
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

let items = [{
        itemId: 1,
        title: "Black shoes",
        description: "Size 40 shoes, which are in good shape",
        category: "Clothes and shoes",
        location: "Oulu",
        images: "www.shoes.com",
        askingPrice: 10,
        dateOfPosting: "16-02-2020",
        deliveryTypeShipping: true,
        delivertTypePickup: false,
        sellerInfoName: "Tiina",
        sellerInfoPhone: "0501234567"
    }]



/*
MIDDLEWARE PART
*/

/*

function validateJSONHeaders(req, res, next)
{
    if(req.get('Content-Type') === 'application/json')
    {
        next();
    }
    else
    {
        const err = new Error('Bad Request - Missing Headers');
        err.status = 400;
        next(err);
    }
}

function validateNewItem(req, res, next)
{
    // prepare error object
    const err = new Error();
    err.name = "Bad Request";
    err.status = 400;
    if(has(req.body, 'title') == false)
    {
        err.message = "Missing or empty title";
        next(err);
    }
    if(has(req.body, 'description') == false)
    {
        err.message = "Missing or empty description";
        next(err);
    }
    if(has(req.body, 'category') == false)
    {
        err.message = "Missing or empty category";
        next(err);
    }
    if(has(req.body, 'location') == false)
    {
        err.message = "Missing or empty location";
        next(err);
    }
    if(has(req.body, 'askingPrice') == false)
    {
        err.message = "Missing or empty asking price";
        next(err);
    }
    if(has(req.body, 'sellerInfoName') == false)
    {
        err.message = "Missing or empty seller name";
        next(err);
    }
    if(has(req.body, 'sellerInfoPhone') == false)
    {
        err.message = "Missing or empty seller phone number";
        next(err);
    }
    next(); // no validation errors, so pass to the next
}

/*
END OF MIDDLEWARE PART
*/

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/items', (req, res) => { res.json(items) });

var cpUpload = upload.fields([{ name: 'images', maxCount: 4 }])
app.post('/items', cpUpload, (req, res) => {
    
//sets name for the uploaded image files
let images = [] 
req.files.forEach((element, i) => {
fs.renameSync(req.files[i].path, './public/' + req.files[i].originalname)
});

    const newItem = {
        itemId: items.length + 1,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        images: req.files['images'],
        askingPrice: req.body.askingPrice,
        dateOfPosting: req.body.dateOfPosting,
        deliveryTypeShipping: req.body.deliveryTypeShipping,
        deliveryTypePickup: req.body.deliveryTypePickup,
        sellerInfoName: req.body.sellerInfoName,
        sellerInfoPhone: req.body.sellerInfoPhone
        }

        items.push(newItem);

        res.status(201);
        res.json(newItem);

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));