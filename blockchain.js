const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let eCoin = new Blockchain();
eCoin.addBlock(new Block(1, "20/07/2017", "José"));
eCoin.addBlock(new Block(2, "20/07/2017", "Maria"));
eCoin.addBlock(new Block(1, "20/07/2017", "José"));
eCoin.addBlock(new Block(2, "20/07/2017", "João"));
eCoin.addBlock(new Block(1, "20/07/2017", "branco"));
eCoin.addBlock(new Block(2, "20/07/2017", "nulo"));

// Verifica se é válida
console.log('Blockchain valid? ' + eCoin.isChainValid());

// manipulando dados
eCoin.chain[1].data = "Maria";

// verifica novamente com dados modificados
console.log("Blockchain valid? " + eCoin.isChainValid());