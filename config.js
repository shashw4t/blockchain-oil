const DIFFICULTY = 3;
//this difficulty is the amount of leading zeroes needed in the hash
//the nonce value is the number of attempts completed by the proof of work until the difficulty requiremnet is satisfied
const MINE_RATE = 3000;
//this mine rate will try and maintain a rate of 1 block mined every 3000 milliseconds 
//by dynamically changing the difficulty in response to amount of blocks mined
const INITIAL_BALANCE  = 500;
//roughly 1000 coins is equivalent to a barrel of oil 
//this balance here is for demonstrations sake, real users would start with a balance of 0
const MINING_REWARD = 10;
//this variable reward for mining transactions into blocks can be lowered or raised as needed

module.exports = { DIFFICULTY, MINE_RATE, INITIAL_BALANCE, MINING_REWARD };

