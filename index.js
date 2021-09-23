const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const postRouter = require('./routes/posts');

app.use('/api/', postRouter);

const { errorHandler } = require('./middleware/ErrorHandler');

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;