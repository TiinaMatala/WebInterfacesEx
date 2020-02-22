
const express = require('express');
const router = express.Router()
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const port = 3000;

app.use(bodyParser.json());
app.use(cors())

const userComponent = require('./components/users');
app.use('/users', userComponent);


app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 
