const express = require('express');
const path = require('path');
require('dotenv').config();

// Constants
const PORT = process.env.PORT || 4200;

// App
const app = express();

app.use(express.static('dist/argus-front-end'));
// app.use(express.static('dist'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist/argus-front-end/index.html'));
});



app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);