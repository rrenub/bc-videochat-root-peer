const Block = require('./block');
const { cryptoHash } = require('../../utils');
const Transaction = require('../transaction');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    /**
     * Añade un bloque a la cadena de bloques
     * @param {transactions[]} - Lista de transacciones a añadir
     */
    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data
        })

        this.chain.push(newBlock)
    }

    /**
     * Comprueba el contenido de las transacciones de la cadena de bloques
     * @param {Blocks[]} - Cadena de bloques
     * @return {boolean} Si es válida
     */
    validTransactionsData({chain}) {
        for(let i=1; i<chain.length; i++) {
            const block = chain[i]
            const transactionSet = new Set();

            for(let transaction of block.data) {
                if(!Transaction.validateTransaction(transaction)) {
                    console.error('Invalid transaction')
                    return false;
                }

                if(transactionSet.has(transaction)) {
                    console.error('Transaction is duplicated (appears more than once in the block')
                    return false;
                }

                transactionSet.add(transaction)
            }
        }
        return true
    }

    /**
     * Comprueba que la cadena de bloques es válida
     * @param {Blocks[]} - Cadena de bloques
     * @return {boolean} Si es válida
     */
    static isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))  {
            return false;
        }

        for(let i=1; i<chain.length; i++) {
            const {timestamp, lastHash, hash, nonce, difficulty, data} = chain[i];
            const actualLastHash = chain[i-1].hash;
            const lastDifficulty = chain[i-1].difficulty;

            if(lastHash !== actualLastHash){
                return false;
            } 

            const validatedHash = cryptoHash(timestamp, lastHash, nonce, difficulty, data );

            if(hash !== validatedHash) {
                return false;
            }

            if(Math.abs(lastDifficulty - difficulty) > 1) {
                return false;
            }
        }
        return true;
    }

    /**
     * Reemplaza la cadena de bloques por otra si es válida
     * @param {Block[]} chain - Cadena de bloques recibida
     * @param {boolean} validateTransactions - Si es necesario validar las transacciones
     * @param {onSuccess} onSuccess - Callback si la cadena de bloques es válida
     */
    replaceChain(chain, validateTransactions, onSuccess) {
        if(chain.length <= this.chain.length) {
            console.error('The incoming chain must be longer')
            return;
        }

        if(!Blockchain.isValidChain(chain)) {
            console.error('The incoming chain must be valid')
            return;
        }

        if(validateTransactions && !this.validTransactionsData({chain})) {
            console.error('The incoming chain has invalid transaction data')
            return;
        }

        if(onSuccess) onSuccess();

        console.log('Replacing chain with', chain)
        this.chain = chain
    }

    /**
     * Devuelve una transacción específica almacenada en la cadena de bloques
     * @param {String} id - ID de la transacción
     * @return {Transaction} si se encuentra la transacción
     */
    getTransaction({id}) {
        for(let block of this.chain){
            for(let transaction of block.data) {
                if(transaction.id === id) {
                    return transaction;
                }
            }
        }
        return null;
    }
}

module.exports = Blockchain;