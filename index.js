/* Levantando el servidor */
const express = require("express");
const path = require("path");
const server = express();

server.use(express.static('public'));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on http://localhost: ${PORT}`));