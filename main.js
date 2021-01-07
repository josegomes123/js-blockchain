const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
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

}

class Blockchain {
  constructor() {
    this.blockchain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2020", "Initial Block in the Chain", "0");
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.blockchain.push(newBlock);
  }

}

let jsCoin = new Blockchain();

jsCoin.addBlock(
  new Block(1, "01/06/2020", {
    sender: "Test1",
    recipient: "Test2",
    quantity: 33
  })
);

jsCoin.addBlock(
  new Block(2, "01/07/2020", {
    sender: "Vitaly Friedman",
    recipient: "Ricardo Gimenes",
    quantity: 100
  })
);

console.log(JSON.stringify(jsCoin, null, 4));
