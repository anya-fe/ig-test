"use strict";

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = 8000;

const express = require('express');

const cors = require('cors');

const axios = require('axios');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
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
    const response = await axios(`${accounts}`, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error
    });
  }
});
app.get('/accounttypes', async (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      Accepts: 'application/json',
      'x-apikey': key
    }
  };

  try {
    const response = await axios(accountTypes, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error
    });
  }
});

const _dirname = _path.default.resolve();

app.use(express.static(_path.default.join(_dirname, '/../client/build')));
app.get('*', (req, res) => res.sendFile(_path.default.join(_dirname, '/../client/build/index.html')));
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});