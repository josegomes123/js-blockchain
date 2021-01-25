import { Transaction, Blockchain} from './blockchain.js';

let jsCoin = new Blockchain();
jsCoin.createTransaction(new Transaction('address1', 'address2', 100));
jsCoin.createTransaction(new Transaction('address2', 'address1', 100));
jsCoin.createTransaction(new Transaction('address2', 'address3', 100));
console.log('Starting miner');
jsCoin.minePendingTransaction('miner-address');
console.log(
	'Balance of miner is ' + jsCoin.getBalanceOfAddress('miner-address')
);
console.log('Starting miner again');
jsCoin.minePendingTransaction('miner-address');
console.log(
	'Balance of miner is ' + jsCoin.getBalanceOfAddress('miner-address')
);
