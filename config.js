const DIFFICULTY = 3;
//This difficulty is the amount of leading zeroes needed in the hash
//The nonce value is the number of attempts completed by the proof of work until the difficulty requirement is satisfied
const MINE_RATE = 3000;
//This mine rate will try and maintain a rate of 1 block mined every 3000 milliseconds 
//by dynamically changing the difficulty in response to amount of blocks mined
const INITIAL_BALANCE  = 500;
//Roughly 1000 coins is equivalent to a barrel of oil 
//This balance here is for demonstrations sake, real users would start with a balance of 0
const MINING_REWARD = 10;
//This variable reward for mining transactions into blocks can be lowered or raised as needed

//The transaction fee would be initialized here

module.exports = { DIFFICULTY, MINE_RATE, INITIAL_BALANCE, MINING_REWARD };

