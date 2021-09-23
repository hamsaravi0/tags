const axios = require('axios');

const axiosPostByTagClient = axios.create({
  headers: {
    'Accept': 'application/json',
  }
});

module.exports = axiosPostByTagClient;
