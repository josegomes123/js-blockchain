import sha256 from './node_modules/crypto-js/sha256.js';
import elliptic from 'elliptic';
import * as KeyGen from "./keyGenerator.js";

class Blockchain {
	constructor() {
		this.blockchain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransaction = [];
		this.miningReward = 100;
	}

	createGenesisBlock() {
		return new Block('01/01/2020', 'Initial Block in the Chain', '0');
	}

	getLatestBlock() {
		return this.blockchain[this.blockchain.length - 1];
	}

	minePendingTransaction(miningRewardAddress) {
		let block = new Block(Date.now(), this.pendingTransaction);
		block.mineBlock(this.difficulty);
		console.log('Block successfully mined!');
		this.blockchain.push(block);
		this.pendingTransaction = [
			new Transaction(null, miningRewardAddress, this.miningReward),
		];
	}

	createTransaction(transaction) {
		this.pendingTransaction.push(transaction);
	}

	// check the entire blockchain for your address balance
	getBalanceOfAddress(address) {
		let balance = 0;
		for (const block of this.blockchain) {
			for (const transaction of block.transactions) {
				if (transaction.fromAddress === address) {
					balance -= transaction.amount;
				} else if (transaction.toAddress === address) {
					balance += transaction.amount;
				}
			}
		}
		return balance;
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

class Block {
	constructor(timestamp, transactions, previousHash = '') {
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return sha256(
			this.index +
				this.previousHash +
				this.timestamp +
				JSON.stringify(this.transactions) +
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
		while (this.hash.substring(0, difficulty) !== array0s.join('')) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log('Block mined: ' + this.hash);
	}
}

class Transaction {
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}

	calculateHash() {
		return sha256(this.fromAddress + this.toAddress + this.amount).toString();
	}

	signTransaction(signingKey) {
        if (signingKey.getPublic("hex") !== this.fromAddress){
            throw new Error("You cannot sign transactions for other wallets!")
        }
		const hashTransaction = this.calculateHash();
		const sign = signingKey.sign(hashTransaction, 'base64');
		this.signature = sign.toDER('hex');
    }
    
    isValid(){
        this.
    }
}

export { Transaction, Blockchain, Block };
