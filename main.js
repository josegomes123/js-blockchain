const SHA256 = require('crypto-js/sha256');

class Block {
	contructor(timestamp, transactions, previousHash = '') {
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
	}

	// Calculate unique hash of block from properties
	calculateHash() {
		return SHA256(
			this.index +
				this.previousHash +
				this.timestamp +
				JSON.stringify(this.data)
		).toString();
	}
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
      }
    

	createGenesisBlock() {
		return new Block(Date.parse('07/01/2021'), [], '0');
	}

	getLatestBlock() {
		return this.chain[this.chain.length -1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

const jsCoin = new Blockchain();


console.log(JSON.stringify(jsCoin, null, 4));
