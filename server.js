const port = process.env.PORT || 5000;
const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accounts = process.env.ACCOUNTS;
const accountTypes = process.env.ACCOUNT_TYPES;
const key = process.env.KEY;

app.get('/accounts', async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            Accepts: 'application/json',
            'x-apikey': key
        }
    };

    try {
        const response = await axios(`${accounts}`, options)
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

app.get('/accounttypes', async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            Accepts: 'application/json',
            'x-apikey': key
        }
    };

    try {
        const response = await axios(accountTypes, options)
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'client/build/index.html')); })

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(port, () => { console.log(`server is running on port ${port}`) });