const { verifySignature } = require("../../utils");

class Transaction {
    constructor({ videoAppID, interventionID, interventionToken, signature}) {
        this.id = interventionID;
        this.input = this.createInput({videoAppID, interventionToken, signature});
    }

    /**
     * Crea los datos de una transacción
     */
    createInput({videoAppID, interventionToken, signature}) {
        return {
            timestamp: Date.now(),
            videoAppID,
            signature,
            interventionToken,
        }
    }

    /**
     * Comprueba que la firma de la transacción es válida
     * @param {Transaction} transaction
     */
    static validateTransaction(transaction) {
        const { input:{ videoAppID, signature, interventionToken }} = transaction;

        if(!verifySignature({publicKey: videoAppID, data: interventionToken, signature})) {
            console.error(`Invalid signature from ${videoAppID}`)
            return false;
        }

        return true;
    }
}

module.exports = Transaction;