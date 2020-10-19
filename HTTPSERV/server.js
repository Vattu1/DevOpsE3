'use strict';

const express = require('express');
const fs = require("fs");

const port = 8080;

const app = express();
app.get('/', (req, res) => {
    fs.readFile("../data/data.txt", (error, data) => {
        if (error) {
            throw error;
        }
        
        res.send(data.toString());
    });
});

app.listen(port);
