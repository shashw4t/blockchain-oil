const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner {

    constructor(blockchain, transactionPool, wallet, p2pServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }
    
    // Mines a new transaction on the blockchain by:
    //Validating transactions on the transaction pool
    //Rewarding the miner
    //Creating new block on the blockchain consisting of the newly validated transactions
    //Synchronizes blockchains between all other peers
    //Clears transaction pool
    //Broadcasts to every miner to clear their transaction pool
    mine() {
        const validTransactions = this.transactionPool.validTransactions();
        validTransactions.push(
            Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
        );
        const block = this.blockchain.addBlock(validTransactions);
        this.p2pServer.syncChains();
        this.transactionPool.clear();
        this.p2pServer.broadcastClearTransactions();

        return block;
    }
}

module.exports = Miner;
