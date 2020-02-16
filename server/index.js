const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

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

let itemData = {
    items: [{
        id: 1,
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
}

/*
MIDDLEWARE PART
*/

/*function validateNewItem(req, res, next)
{
    // prepare error object
    const err = new Error();
    err.name = "Bad Request";
    err.status = 400;
    if(has(req.body, 'name') == false)
    {
        err.message = "Missing or empty name";
        next(err);
    }
    if(has(req.body, 'image') == false)
    {
        err.message = "Missing or empty image";
        next(err);
    }
    next(); // no validation errors, so pass to the next
}

/*
END OF MIDDLEWARE PART
*/

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/items', (req, res) => { res.json(itemData.items) });

app.post('/items',
[
    validateJSONHeaders
  ],
    (req, res) => {
    const newItem = {
        id: itemData.items.length + 1,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        images: req.body.images,
        askingPrice: req.body.askingPrice,
        dateOfPosting: req.body.dateOfPosting,
        deliveryTypeShipping: req.body.deliveryTypeShipping,
        deliveryTypePickup: req.body.deliveryTypePickup,
        sellerInfoName: req.body.sellerInfoName,
        sellerInfoPhone: req.body.sellerInfoPhone
        }

        itemData.items.push(newItem);

        res.status(201);
        res.json(newItem);

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));