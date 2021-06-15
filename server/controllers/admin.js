const adminController = require('express').Router();
const adminService = require('../models/admin')
const Singleton = require('../singleton')


/**
 * Devuelve la lista de nodos validadores
 */
adminController.get('/nodes', async (req, res) => {
    const auth = req.currentUser;

    if(auth) {
        try {
            const data = await adminService.getNodes()
            return res.status(200).send(data)
        } catch(error) {
            console.log(error)
            return res.status(404).send('Error fetching pending nodes from database')
        }
    }
    return res.status(403).send('Not authorized')
})

/**
 * Elimina un nodo de la lista de nodos validadores
 */
adminController.post('/delete-node', async (req, res) => {
    const auth = req.currentUser;
    console.log(req.body)

    if(auth) {
        try {
            await adminService.deleteNode(req.body.ID)
            return res.status(200).send()
        } catch(error) {
            console.log(error)
            return res.status(404).send('Error deleting node from database')
        }
    }
    return res.status(403).send('Not authorized')
})

/**
 * Añade un nodo a la lista de nodos validadores
 */
adminController.post('/add-node', async (req, res) => {
    const auth = req.currentUser;

    if(auth) {
        try {
            await adminService.addNode(req.body.ID)
            return res.status(200).send()
        } catch(error) {
            console.log(error)
            return res.status(404).send('Error creating node from database')
        }
    }
    return res.status(403).send('Not authorized')
})

/**
 * Otorga los datos de inicializacion a los nodos validadores
 */
adminController.post('/sync-node', async (req, res) => {
    const { id } = req.body
    const transactionPool = Singleton.getTransactionPool().transactionMap
    const blockchain = Singleton.getBlockchain().chain
    const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

    if(await adminService.isValidator(id)) {
        res.send({ transactionPool, blockchain, redisUrl })
    } else {
        res.status(403).send('Not authorized')
    }
})

module.exports = adminController
