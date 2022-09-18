const Contenedor = require("./contenedor.js");
const express = require('express');
const app = express();

const PORT = 8080;
const contenedor = new Contenedor("productos.json");

app.get('/', (req, res) => {
    res.send('Alo Express Server! ingresa "productos", "libros" o "productoRandom" para ver mas')
});

app.get('/productos', async (req, res) => {
    const allProducts = await contenedor.getAll();
    res.json(allProducts);
});

app.get('/productoRandom', async (req, res) => {
    const allProducts = await contenedor.getAll();
    const maxId = allProducts.length;
    
    const randomNumber = generateRandomNumber(1, maxId);
    const randomProduct = await contenedor.getById(randomNumber);

    res.json(randomProduct);

})

app.get('/libros', (req, res) => {
    res.send('Alo, estas en Libros')
});

app.get('/object', (req, res) => {
    res.json({title: 'Monster', author: 'Naoki Urasawa'})
});

const generateRandomNumber = (min, max) => {
    return Math.floor((Math.random() * (max+1 -min)) +min);
}

const server = app.listen(PORT, () => {
    console.log(`>>>> Server started at http://localhost:${PORT}`)
})

server.on('error', (error) => console.log(error));