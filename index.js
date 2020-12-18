Web3 = require('web3');
const fs = require('fs');
const express = require('express');
const app = express();

connection = new Web3('http://127.0.0.1:8545');
// connection.eth.getAccounts().then(console.log);

abi = JSON.parse(fs.readFileSync('/Users/kristupasbelickas/Documents/uni/dev/blockchain/ethereum/contracts/SmartContract_sol_SmartContract.abi'));
contract = new connection.eth.Contract(abi);
bytecode = fs.readFileSync('/Users/kristupasbelickas/Documents/uni/dev/blockchain/ethereum/contracts/SmartContract_sol_SmartContract.bin').toString();
listOfPosts = ['A Beginner’s Guide to Ethereum','How Does Ethereum Work?','The Year in Ethereum','What is Ethereum 2.0?', 'Ethereum is a Dark Forest'];

contract.deploy({
    data: bytecode,
    arguments: [listOfPosts.map((name) =>
      connection.utils.asciiToHex(name))]
    }).send({
      from: '0xE24208D2E744ACb86A525Da3334F8550f97CFf34',
      gasPrice: connection.utils.toWei('0.00003', 'ether'),
      gas: 1500000
    }).then((deployedContract) => {
    contract.options.address = deployedContract.options.address;
    console.log(deployedContract.options.address);
});

app.listen(3000, function() {
    console.log('listening on 3000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/how_does_ethereum_work', (req, res) => {
    contract.methods.totalLikesFor(connection.utils.asciiToHex('How Does Ethereum Work?')).call(console.log);
});
app.get('/a_beginners_guide_to_ethereum', (req, res) => {
    contract.methods.totalLikesFor(connection.utils.asciiToHex('A Beginner’s Guide to Ethereum')).call(console.log);
});
app.get('/the_year_in_ethereum', (req, res) => {
    contract.methods.totalLikesFor(connection.utils.asciiToHex('The Year in Ethereum')).call(console.log);
});
app.get('/what_is_ethereum_2_0', (req, res) => {
    contract.methods.totalLikesFor(connection.utils.asciiToHex('What is Ethereum 2.0?')).call(console.log);
});
app.get('/ethereum_is_a_dark_forest', (req, res) => {
    contract.methods.totalLikesFor(connection.utils.asciiToHex('Ethereum is a Dark Forest')).call(console.log);
});

app.post('/a_beginners_guide_to_ethereum', (req, res) => {
    contract.methods.likePost(connection.utils.asciiToHex('A Beginner’s Guide to Ethereum')).send({from: '0xE24208D2E744ACb86A525Da3334F8550f97CFf34'}).then((response) => console.log(response)).then(result => {
        res.redirect('/');
    });
});
app.post('/how_does_ethereum_work', (req, res) => {
    contract.methods.likePost(connection.utils.asciiToHex('How Does Ethereum Work?')).send({from: '0xE24208D2E744ACb86A525Da3334F8550f97CFf34'}).then((response) => console.log(response)).then(result => {
        res.redirect('/');
    });
});
app.post('/the_year_in_ethereum', (req, res) => {
    contract.methods.likePost(connection.utils.asciiToHex('The Year in Ethereum')).send({from: '0xE24208D2E744ACb86A525Da3334F8550f97CFf34'}).then((response) => console.log(response)).then(result => {
        res.redirect('/');
    });
});
app.post('/what_is_ethereum_2_0', (req, res) => {
    contract.methods.likePost(connection.utils.asciiToHex('What is Ethereum 2.0?')).send({from: '0xE24208D2E744ACb86A525Da3334F8550f97CFf34'}).then((response) => console.log(response)).then(result => {
        res.redirect('/');
    });
});
app.post('/ethereum_is_a_dark_forest', (req, res) => {
    contract.methods.likePost(connection.utils.asciiToHex('Ethereum is a Dark Forest')).send({from: '0xE24208D2E744ACb86A525Da3334F8550f97CFf34'}).then((response) => console.log(response)).then(result => {
        res.redirect('/');
    });
});