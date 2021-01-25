import elliptic from 'elliptic';
// for ES6 import
const EC = elliptic.ec;
const ec = new EC('secp256k1');

export const key = ec.genKeyPair();
export const publicKey = key.getPublic('hex');
export const privateKey = key.getPrivate('hex');

console.log('private key: ' + privateKey);
console.log('public key: ' + publicKey);
