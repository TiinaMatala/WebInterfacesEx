
const express = require('express');

const router = express.Router()
const cors = require('cors');
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
app.use(cors())

const itemComponent = require('./components/items');
const userComponent = require('./components/users');


app.use('/users', userComponent);
app.use('/items', itemComponent);


app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 
