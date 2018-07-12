var Web3 = require('web3');
var web3 = new Web3("https://api.myetherapi.com/eth");    //this is testrpc's url running on port 8545
var account = web3.eth.accounts.create();
console.log(account);