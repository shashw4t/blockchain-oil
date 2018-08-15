const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config');
//These variables from the config file are how hard the proof of work for mining a block and adding it onto the blockchain will be

//This class creates the block object that acts as an individual link in the chain.
class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp; 
    //When this block was produced, note this is affected by the time taken by mining
    this.lastHash = lastHash; 
    //Chains this block to the previous block in the chain, similar to a linked list
    this.hash = hash; 
    //SHA-256 hash produced by the values of the block run through the crypto-js hash function
    this.data = data; 
    //This data is the transaction as this is a crptocurrency, but could be anything from anti-counterfeit measures to healthcare information
    this.nonce = nonce;
    //This is a value made from counting each hash generation attempt and is used to quickly validate the block's hash
    this.difficulty = difficulty || DIFFICULTY;
    //This dynamic difficulty level will oscillate to maintain the mining rate of adding blocks to the chain
  }

  toString() {
      return `Block - 
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0,10)}
      Hash      : ${this.hash.substring(0,10)}
      Nonce     : ${this.nonce}
      Difficulty: ${this.difficulty}
      Data      : ${this.data}`;
  }

  //This is the first block for the blockchain that needs to be created manually, so the future blocks can chain to this
  //This doesn't store any data, and is mostly needed for it's hash value
  static genesis() {
      return new this('Genesis time', '-----', 'theGenesisBlock', [], 0, DIFFICULTY);
  }

  //This method allows users to mine a block of transactions and where the dynamic difficulty level is applied
  //This blockchain’s default mine rate is 3000 milliseconds and the difficulty level is adjusted 
  //based on whether blocks are mined faster or slower
  
  static mineBlock(lastBlock, data) {
      let hash, timestamp; 
      const lastHash = lastBlock.hash;
      let { difficulty } = lastBlock;
      let nonce = 0;

      do {
        nonce++;
        timestamp = Date.now();
        difficulty = Block.adjustDifficulty(lastBlock, timestamp);
        hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
      } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
     
      return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  //This produces the hash value 
  static hash(timestamp, lastHash, data, nonce, difficulty) {
      return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }

  static blockHash(block) {
      const {timestamp, lastHash, data, nonce, difficulty} = block;
      return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  //This method checks the timestamp from the previous block to see if the time passed is greater than or less than the mine rate
  //and then accordingly decreases or increases the difficulty
  static adjustDifficulty(lastBlock, currentTime) {
      let { difficulty } = lastBlock; 
      difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
      return difficulty;
  }
}

module.exports = Block; 
