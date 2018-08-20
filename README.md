# Blockchain-Oil

## General Description
This is a blockchain application for a commodity based coin, which in this case is oil, but could be gold or anything with a more stable value. This cryptocurrency blockchain maintains many of the pertinent features utilized by Bitcoin and Ethereum. Many of the implemented features come straight from the original Bitcoin [whitepaper](https://bitcoin.org/bitcoin.pdf).
> peer to peer secure blockchain server that accepts multiple connections 
>
> digital signatures (SHA-256) and payment verification
>
> timestamp on each block so they can be properly ordered
>
> transaction system for transferring funds between nodes
>
> secure wallets for storing a public-private key pair
>
> mining with a proof of work system for adding new blocks to the blockchain with a dynamic difficulty level and a financial incentive
>
> full blockchain replication among all the clients

## Development 
This was devloped with Node.js primarily. I used Postman to sendrequests to the peer-to-peer server and Jest to do cumulative unit testing. 

 The Node.js modules used were: 
* nodemon - to restart node when the code was changed and resaved
* jest - to write and run unit tests on the code
* crypto-js - to generate the SHA256 hashes
* express - to create an application and web server 
* body-parser - to convert http and post requests into JSON format
* WebSocket - to set up the peer-to-peer server and to connect and communicate with new users 
* elliptic - to produce public-private keypairs to sign transactions using elliptic curve cryptography
* uuid - to make unique transactions identifiers

###### Jest Testing 
Nearly every aspect of the blockchain was check through Jest unit tests which can be identified with the `filename.test.js` extension. Each unit test is labeled with the `it` statement and is grouped with `describe` statements. These tests are executed with the `npm run test` command. If a test fails, Jest helpfully shows the description of the failed test. These tests make sure as new features are added that everything previously built is still functional.

## Functionality 
This blockchain functions through transactions being completed and then mined. As transactions are made and sent to the ledger, they are added to a transaction pool and can no longer be changed or removed at this point. When a user mines the block, every available transaction is added as a block onto the blockchain. Once the block with potentially multiple transactions is mined, the transaction pool is cleared for all users. Then, this new block is chained to the last block by storing the last block's hash value. Once the blockchain is updated, all other users automatically receive the longer blockchain. In the case where multiple users mine blocks simulatenously, the system will make the longest chain the master blockchain and the other user will have their blocks joined onto the longer chain. This keeps the system decentralized as each user has a copy of the blockchain. *The classes in this repository will have comments to clarify their functionality as well.*

###### Web Application Commands
Get Requests 
* `/blocks` - view the user's copy of the blockchain
* `/transactions` - view the user's copy of the unmined transaction pool
* `/mine-transactions` - add the cryptocurrency transactions onto the blockchain
* `/public-key` - view the user's public-key value
* `/balance` - view the user's wallet balance

Post Request
* `/mine` - this is a testing feature to add a non-cryptocurrency block to the blockchain
* `/transact` - adds a new cryptocurrency transaction to the transaction pool

## Peer-to-Peer Server
This facillitates communication between each user on the network. The communication lets users receive an update blockchain from their peers and to broadcast their updated blockchain back to their peers. Along with managing blockchain synchronization and validating the blockchains being broadcasted, the server also handles all incoming messages sent from users. There are three message types the server handles. 
* Replace the current blockchain with a new blockchain
* Update or add a new transaction to the transaction pool
* Clear the transaction pool 

## Proof of Work
The proof of work system serves as another line of defense along with chain verification and public/private key signatures. This ensures that only legitimate blocks are added to the chain. Since a blockchain is decentralized any user is capable of adding a block onto the chain, but the proof of work system makes it computationally expensive to do so. This serves as a deterrent to any corrupt blocks. This blockchain uses a similar proof of work system to Bitcoin's Hashcash. The goal of this proof of work system is to produce a hash with a specific amount of leading zeroes, which is the *difficulty* level. The higher the difficulty level, the longer it will take to produce a valid hash. The *nonce* is a value that is iterated for every hash generation attempt for each block. The nonce value is also stored in the block and is used to quickly verify a block's veracity. This blockchain uses a *dynamic* difficulty level to maintain a certain *mine rate*. The mine rate is the expected time in between blocks being mined and is specified with these other values in the `config`. If the time passed between blocks being mined is greater than the mining rate, the difficulty is decreased and vice versa. 

## Wallet 
The wallet object store's the user's balance and their public-private key pair. The private key generates signatures for the user's transactions and the public key is used to verify the signatures. The public key is also the public address for the wallet. The key pair is generated with secp256k1 elliptical algorithm, the same algorithm used by Bitcoin. There is a special address for reward transactions that comes from a 'Blockchain Wallet'. The wallet avoids double counting by recalculating the wallet's balance whenever a block is mined.

## Transactions 
This blockchain's primary function is to act as a easy trading platform for oil through cryptocurrency and to do that it provides a reliable, permanent, and secure record of every transaction. Each transaction object stored on the blochchain has a unique `ID` to identify the transasction object, a single `Input` object, and an array of `Outputs` objects. 

`Input` 
This has the sender's address, sender's public key, sender's starting balance, timestamp, and sender's signature of the transaction.

`Output`
This has the recipient address and the amount to be transferred.

###### Digital Signatures 
Every sent transaction are signed with the sender's private key and the recipient verifies the transaction by decrypting the cryptographic hash with the user's public key. 

## Transaction Pool
Before transactions are permanently added to the blockchain, they are placed into a transaction pool. Miners work to solve the proof of work system and once they have an appropriate hash and nonce, they can add these blocks to the blockchain. Each user has a copy of the pool as well as the blockchain and once the message is sent to update the blockchain another message is sent to clear the transaction pool.

## Miners

