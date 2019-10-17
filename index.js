require('dotenv').config();
const express = require('express');
const massive = require('massive');
const products_controller = require('./products_controller');

const app = express();

const {SERVER_PORT,CONNECTION_STRING} = process.env;

massive(CONNECTION_STRING).then(db => {
    console.log('database connected')
    app.set('db', db)
}).catch((err) => console.log(err))

app.use(express.json());

app.post('/api/products', products_controller.create);
app.get('/api/products/:id', products_controller.getOne);
app.get('/api/products', products_controller.getAll);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.deleteOne);


app.listen(SERVER_PORT, () => {console.log(`Listening on port ${SERVER_PORT}`)});