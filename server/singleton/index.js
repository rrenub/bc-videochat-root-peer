const Blockchain = require('../data/blockchain');
const PubSub = require('../app/pubsub')
const TransactionPool = require('../data/transaction/transaction-pool')

/**
 * Crea una instancia de cada elemento para que se acceda desde cualquier parte del código
 */

const blockchain = new Blockchain();
const transactionPool = new TransactionPool()
const pubsub = new PubSub({ blockchain, transactionPool});

const getBlockchain = () => blockchain;
const getTransactionPool = () => transactionPool;
const getPubSub = () => pubsub;

module.exports = {
    getBlockchain,
    getTransactionPool,
    getPubSub
}