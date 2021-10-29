const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {res.send(`<h1>This is my homepage</h1>`)});
app.get('/about', (req, res) => {
    res.send(`
    <h1>This is the about page</h1>
    <img src='https://i.pinimg.com/736x/7d/65/5a/7d655a8c0318b2083a89c0b529e35fbe.jpg'>
    `)});

app.get(`/search`, (req, res) => {res.send(`Get the result ${req}`)});
app.listen(port, ()=>{console.log(`Express server is running and listening to the port ${port}`)});