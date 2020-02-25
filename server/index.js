const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'public/' })
const path = require('path');

const port = 3000;
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

const itemComponent = require('./components/items');

app.use('/items', itemComponent);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));