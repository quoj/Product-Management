const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ ProductStoreCode: -1 });
        res.render('index', { products });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/form', (req, res) => {
    res.render('form');
});

router.post('/add', async (req, res) => {
    const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;
    const product = new Product({ ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode });

    try {
        await product.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
