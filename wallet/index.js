const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const {INITIAL_BALANCE } = require('../config');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE; 
        this.keyPair = ChainUtil.genKeyPair(); 
        this.publicKey = this.keyPair.getPublic().encode('hex'); 
    }

    toString() {
        return `Wallet - 
        publicKey: ${this.publicKey.toString()}
        balance: ${this.balance}`
    }

    //Signing transactions with key pair verification
    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount,blockchain, transactionPool) {
        this.balance = this.calculateBalance(blockchain);

        if (amount > this.balance) {
            console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`);
            return;
        }

        let transaction = transactionPool.existingTransaction(this.publicKey);

        if (transaction) {
            transaction.update(this, recipient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }

        return transaction;
    }

    //Updates balance for wallet with blockchains updates
    //only checking new blocks mined (added) since last time balance was calculated
    //divides up transactions into those that transfered money TO this wallet and FROM this wallet
    //sets the balance of this wallet after calculating it, so won't have to re-calculate next time
    //if blockchain hasn't changed - will be super quick
    calculateBalance(blockchain) {
        let balance = this.balance;
        let transactions = [];
        blockchain.chain.forEach(block => block.data.forEach(transaction => {
            transactions.push(transaction);
        }));

        const walletInputTs = transactions
        .filter(transaction => transaction.input.address === this.publicKey);
        let startTime = 0;

        if(walletInputTs.length >  0){
            const recentInputT = walletInputTs.reduce(
                (prev,current) => prev.input.timestamp > current.input.timestamp ? prev:current
            );

            balance = recentInputT.outputs.find(output => output.address === this.publicKey).amount;
            startTime = recentInputT.input.timestamp;
        }

        transactions.forEach(transaction => {
            if(transaction.input.timestamp > startTime) {
                transaction.outputs.find(output => {
                    if (output.address === this.publicKey) {
                        balance += output.amount;
                    }
                });
            }
        });
        return balance;
    }

    //Wallet that handles dealing out rewards for mining
    static blockchainWallet() {
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    } 
}

module.exports = Wallet;
