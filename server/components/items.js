const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: '../public/' });
const path = require('path');
const fs = require('fs');

router.use('/static', express.static(path.join(__dirname, 'public')))

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

router.get('/', (req, res) => { res.json(items) });

let cpUpload = upload.fields([{ name: 'images', maxCount: 4 }])
router.post('/', cpUpload, (req, res) => {

let images = []
//sets name for the uploaded image files
if (req.files['images'].length <= 4) {
    console.log("visited");

    req.files['images'].forEach((element) => {
    fs.renameSync(element.path, './public/' + element.originalname)
    });
    images.push(req.files.originalname)
} 
else {
    res.send('Max four images allowed');
    console.log("no files found");
}    

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
    sellerInfoPhone: req.body.sellerInfoPhone,
    }

    items.push(newItem);

    res.status(201);
    res.json(newItem);

})

/*router.delete('./:id', (req, res) => {

})*/

module.exports = router;