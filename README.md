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
