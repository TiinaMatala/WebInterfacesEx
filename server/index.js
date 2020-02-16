const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [
    {
        id: 1,
        title: "Black shoes",
        description: "Size 36 shoes, which are in good shape",
        category: "Clothes and shoes",
        location: "Oulu",
        images: "www.shoes.com",
        askingPrice: 5,
        dateOfPosting: "16-02-2020",
        deliveryType: {
            shipping: true,
            pickup: false
        },
        sellerInfo: {
            name: "Tiina",
            phone: "0501234567"
        }
    }
]

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/items', (req, res) => res.json(items));

/*app.post('/items', (req, res) => {

    if(req.body.hasOwnProperty('email'))
  {

    items.push({
        id: items.length + 1,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        images: req.body.images,
        askingPrice: req.body.askingPrice,
        dateOfPosting: req.body.dateOfPosting,
        deliveryType: {
            shipping: req.body.shipping,
            pickup: req.body.pickup
        },
        sellerInfo: {
            name: req.body.name,
            phone: req.body.phone
        }
    })

    res.status(201).json('Created')

    }

    else {
        res.status(400);
    }
})*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`));