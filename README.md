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
This was devloped with Node.js primarily. I used Postman to send http requests to the peer-to-peer server and Jest to do cumulative unit testing. 

 The Node.js modules used were: 
* nodemon - to restart node when the code was changed and resaved
* jest - to write and run unit tests on the code
* crypto-js - to generate the SHA256 hashes
* express - to create an application and http web server 
* body-parser - to convert http and post requests into JSON format
* WebSocket - to set up the peer-to-peer server and to connect and communicate with new users 
* elliptic - to produce public-private keypairs to sign transactions using elliptic curve cryptography
* uuid - to make unique transactions identifiers

###### Jest Testing 
Nearly every aspect of the blockchain was check through Jest unit tests which can be identified with the `filename.test.js` extension. Each unit test is labeled with the `it` statement and is grouped with `describe` statements. These tests are executed with the `npm run test` command. If a test fails, Jest helpfully shows the description of the failed test. These tests make sure as new features are added that everything previously built is still functional.

## Functionality 
This blockchain functions through transactions being completed and then mined. As transactions are made and sent to the ledger, they are added to a transaction pool and can no longer be changed or removed at this point. When a user mines the block, every available transaction is added as a block onto the blockchain. Once the block with potentially multiple transactions is mined, the transaction pool is cleared for all users. Then, this new block is chained to the last block by storing the last block's hash value. Once the blockchain is updated, all other users automatically  receive the longer blockchain. This keeps the system decentralized as each user has a copy of the blockchain. The classes in this repository will have comments to clarify their functionality as well.

