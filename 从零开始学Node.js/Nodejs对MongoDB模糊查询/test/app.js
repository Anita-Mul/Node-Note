const express = require('express');
const app = express();
const movieRouter = require('./movieRouter');

app.use('/movie', movieRouter);


app.listen(3000, function () {
    console.log("express is running");
})