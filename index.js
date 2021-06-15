const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const path = require('path');
const dotenv = require('dotenv').config()

const app = express();

const blockchainRouter = require('./server/controllers/blockchain')
const adminRouter = require('./server/controllers/admin')
const decodeIDToken = require('./server/middleware/authToken')

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json())
app.use(morgan(':method :url - status: :status - :response-time ms'))
// Autenticación de Firebase
app.use(decodeIDToken)
// Parsea las peticiones recibidas JSON.
app.use(express.json())
//Permite habilitar CORS
app.use(cors())

//controllers
app.use('/api', blockchainRouter)
app.use('/admin', adminRouter)


const PORT = process.env.PORT || process.env.DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Root node listening at localhost:${PORT}`)
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

