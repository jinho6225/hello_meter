const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);
app.use('/', express.static(path.join(__dirname, '../build')));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})