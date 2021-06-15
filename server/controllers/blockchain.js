const blockchainController = require('express').Router();
const Singleton = require('../singleton')

/**
 * Devuelve una transacción específica
 */
blockchainController.post('/get-transaction', (req, res) => {
    const { interventionID } = req.body

    const transaction = Singleton.getBlockchain().getTransaction({id: interventionID})

    if(transaction) {
        console.log('Transaction found', transaction)
        res.json(transaction) 
    } else {
        console.log('Transaction not found')
        res.status(204).send('Transaction not found')
    }
});

/**
 * Devuelve la cadena de bloques actual
 */
blockchainController.get('/blocks', (req, res) => {
    console.log('la chain es', Singleton.getBlockchain().chain)
    res.status(200).send(Singleton.getBlockchain().chain)
});

/**
 * Devuelve el pool de transacciones actual
 */
blockchainController.get('/transaction-pool', (req, res) => {
    const transactionPool = Singleton.getTransactionPool().transactionMap
    res.send(transactionPool)
})


/**
 * Comparte una transacción para que sea añadida a la cadena de bloques
 */
blockchainController.post('/transact', (req, res) => {
    console.log('[POST REQUEST] /api/transact')
    const {videoAppID, interventionID, interventionToken, signature} = req.body

    let transaction;

    //Se crea la transacción
    try {
        transaction = Singleton.getTransactionPool().createTransaction({videoAppID, 
            interventionID, 
            interventionToken, 
            signature
        })
    } catch (error) {
        console.log('Error', transaction)
        return res.status(400).send(error.message)
    }
    
    //Añade la transacción al pool de transacciones
    Singleton.getTransactionPool().setTransaction(transaction)

    //Se difunde la transacción recibida
    Singleton.getPubSub().broadcastTransaction(transaction)

    res.send('Transaction received and broadcasted in the blockchain')
})

module.exports = blockchainController