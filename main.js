const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return SHA256(
			this.index +
				this.previousHash +
				this.timestamp +
				JSON.stringify(this.data) +
				this.nonce
		).toString();
	}

  // Proof Of Work algorithm
	mineBlock(difficulty) {
    // Create array of 0s with difficulty
		let array0s = new Array(difficulty);
    for (let i = 0; i < difficulty; ++i) array0s[i] = 0;
    // Block is mined when calculateHash() substring of length "difficulty" matches all 0s
    // Hash is changed with nonce
    // Higher Difficulty increases solving time exponentially
		while (this.hash.substring(0, difficulty) !== array0s.join("")) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log('Block mined: ' + this.hash);
	}
}

class Blockchain {
	constructor() {
    this.blockchain = [this.createGenesisBlock()];
    this.difficulty = 4;
	}

	createGenesisBlock() {
		return new Block(0, '01/01/2020', 'Initial Block in the Chain', '0');
	}

	getLatestBlock() {
		return this.blockchain[this.blockchain.length - 1];
	}

	addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
		this.blockchain.push(newBlock);
	}

	// Test integrity of blockchain
	isChainValid() {
		for (let i = 1; i < this.blockchain.length; i++) {
			const currentBlock = this.blockchain[i];
			const previousBlock = this.blockchain[i - 1];
			// Hash of each block has to be valid
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}
			// Hashes of chained blocks must match
			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}
}

let jsCoin = new Blockchain();

console.log("Mining block 1:");
jsCoin.addBlock(
	new Block(1, '01/06/2020', {
		sender: 'Test1',
		recipient: 'Test2',
		quantity: 33,
	})
);

console.log("Mining block 2:");
jsCoin.addBlock(
	new Block(2, '01/07/2020', {
		sender: 'Vitaly Friedman',
		recipient: 'Ricardo Gimenes',
		quantity: 100,
	})
);

// console.log(JSON.stringify(jsCoin, null, 4));

// console.log("is chain valid " + jsCoin.isChainValid());

// jsCoin.blockchain[1].data = {amount:100};
// console.log("is chain valid " + jsCoin.isChainValid());
// jsCoin.blockchain[1].hash = savje
