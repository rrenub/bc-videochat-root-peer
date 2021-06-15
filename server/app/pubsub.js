const redis = require('redis')
const { getRandomInt } = require('../utils/index')
const adminService = require('../models/admin')
const dotenv = require('dotenv').config()

const REDIS_URL = process.env.REDIS_URL || process.env.REDIS_LOCAL_URL

const CHANNELS = {
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION'
}

class PubSub {
    constructor({blockchain, transactionPool}) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;

        this.publisher = redis.createClient(REDIS_URL);
        this.subscriber = redis.createClient(REDIS_URL);

        this.subscribeToChannels();

        this.subscriber.on('message', (channel, message) => {
            this.handleMessage(channel, message)
        })
    }

    /**
     * Gestiona los mensajes recibidos
     * @param {String} channel - Canal donde se recibe el mensaje
     * @param {String} message - Mensaje recibido
     */
    handleMessage(channel, message) {
        console.log(`Message received: Channel: ${channel}. Message: ${message}.`)
        const parsedMessage = JSON.parse(message);

        switch(channel) {
            case CHANNELS.BLOCKCHAIN:
                this.blockchain.replaceChain(parsedMessage, true, () => {
                    this.transactionPool.clearBlockchainTransactions({
                        chain: parsedMessage
                    })
                })
                break;
            default:
                return;
        }
    }

    /**
     * Suscribe a los canales de comunicación
     */
    subscribeToChannels() {
        Object.values(CHANNELS).forEach((channel) => {
            this.subscriber.subscribe(channel)
        })
    }

    /**
     * Publica un mensaje
     * @param {String} channel - Canal donde se publica el mensaje
     * @param {String} message - Mensaje enviado
     */
    publish({ channel, message }) {
        this.subscriber.unsubscribe(channel, () => {
            this.publisher.publish(channel, message, () => {
                this.subscriber.subscribe(channel)
            });
        })
    }

    /**
     * Comparte la cadena de bloques actual
     */
    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        })
    }

    /**
     * Comparte una transacción para que sea minada por el nodo elegido
     * @param {transaction} transaction - Transaccion a añadir a la cadena de bloques
     */
    async broadcastTransaction(transaction) {
        //Se elige el nodo que realiza el minado
        const nodes = await adminService.getNodes()
        const peerToMine = getRandomInt(0, nodes.length-1)
        const peerToMineID = nodes[peerToMine].ID

        const message = {
            peerToMineID,
            transaction
        }

        //Envía el mensaje en el canal TRANSACTION
        this.publish({
            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify(message)
        })
    }

}

module.exports = PubSub
