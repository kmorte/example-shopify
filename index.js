import express from 'express';
import dotenv from 'dotenv';
import { Shopify } from '@shopify/shopify-api';
import cors from 'cors';

dotenv.config();

// const host = '127.0.0.1';
const port = 3000;

const app = express();
app.use(cors())
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_API_SCOPES, TEST } = process.env;


const HOST = 'sd'
const shops = {};

Shopify.Context.initialize({
    API_KEY: SHOPIFY_API_KEY,
    API_SECRET_KEY: SHOPIFY_API_SECRET,
    SCOPES: SHOPIFY_API_SCOPES,
    HOST_NAME: HOST,
    IS_EMBEDDED_APP: true
})

app.get('/', async (req, res) => {

    console.log('TEST', TEST);

    console.log('HOST --> ', HOST);
    if(typeof shops[req.query.shop] !== 'undefined') {

        res.send('Hello World');

    } else {

        res.redirect('/auth?shop=' + req.query.shop);

    };
});

app.get('/auth', async (req, res) => {

    const authRoute = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        '/auth/callback',
        false
    );

    console.log('authRoute', authRoute);

    res.redirect(authRoute);
});

app.listen(port, () => {
    console.log('Server at', 'port ', port);
})