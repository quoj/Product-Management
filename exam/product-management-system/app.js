const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');  

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/productmanagement');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
