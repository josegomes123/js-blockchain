import { Transaction, Blockchain } from './blockchain.js';
import elliptic from 'elliptic';
const EC = elliptic.ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate(
	'8875d1c4c93025166ff58fb89fd9e52f299c90163a268205b732cb5314924ea8'
);
const myWallet = myKey.getPublic('hex');

let jsCoin = new Blockchain();

const tx1 = new Transaction(myWallet, 'public key here', 10);
tx1.signTransaction(myKey);
jsCoin.addTransaction(tx1);
console.log('Starting miner');
jsCoin.minePendingTransaction(myWallet);
console.log('Balance of miner is ' + jsCoin.getBalanceOfAddress(myWallet));

// jsCoin.blockchain[1].transactions[0].amount = 1;

console.log('is chain valid? ' + jsCoin.isChainValid());
