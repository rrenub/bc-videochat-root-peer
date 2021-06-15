const MINE_RATE = 1000; //1 segundo
const MINING_DIFFICULTY = 10;

const GENESIS_DATA = {
    timestamp: 1622079334,
    lastHash: '----',
    hash: 'first-hash',
    difficulty: MINING_DIFFICULTY,
    nonce: 0,
    data: [],
}

module.exports = { 
    GENESIS_DATA, 
    MINE_RATE, 
    MINING_DIFFICULTY
}