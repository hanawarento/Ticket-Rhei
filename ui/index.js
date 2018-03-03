var CONTRACT;

$(function(){
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("current");
    console.log(web3);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    console.log("new");
    console.log(web3);
  }
  const json ='[ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "owners", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "symbol", "type": "string" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "owner", "type": "address" } ], "name": "TicketIssued", "type": "event" }, { "constant": false, "inputs": [ { "name": "_name", "type": "string" }, { "name": "_symbol", "type": "string" }, { "name": "_initialSupply", "type": "uint256" } ], "name": "issueTicket", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "test", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_ticket", "type": "address" } ], "name": "ownerOf", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "listTickets", "outputs": [ { "name": "", "type": "address[]", "value": [] } ], "payable": false, "stateMutability": "view", "type": "function" } ]';
  const abi = JSON.parse(json);
  const TicketRhei_contract = web3.eth.contract(abi);
  CONTRACT = TicketRhei_contract.at('0x404F2A9afaEbDF5Bc29A5082C2c4e2e839AF2598');
  var event = CONTRACT.TicketIssued();
  event.watch(function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    console.log(result);
  });
});

function issueTicket() {
  //console.log(web3.eth.accounts);
  let from = $('#issue-ticket-address').val();
  let name = $('#issue-ticket-name').val();
  let symbol = $('#issue-ticket-symbol').val();
  let amount = $('#issue-ticket-amount').val();
  console.log(from + ":" + name + ":" + symbol + ":" + amount);
  if (!from || !name || !symbol || !amount || amount <= 0) {
    alert('Inputs are invalid');
    return;
  }
  CONTRACT.issueTicket.sendTransaction(name, symbol, amount, {from: from}, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(result);
  });
}

function viewTicket() {
  let address = $('#view-ticket-address').val();
  CONTRACT.listTickets.call(address, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(result);
  });
}
