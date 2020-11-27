// check web3 provider with fallback for old version
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
  try {
      // ask user for permission
      ethereum.enable()
      // user approved permission
  } catch (error) {
      // user rejected permission
      console.log('user rejected permission')
  }
}
else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider)
  // no need to ask for permission
}
else {
  window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}
console.log (window.web3.currentProvider)

var contractAddress = '0x7ac4ccdae6b8d2509501ffe680932bfd92d92bd3';
var abi = moneyMotivate;

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions
function checkYourBalance() {
  contract.methods.checkYourBalance().call({from: account}).then( function( info ) {
    console.log("call info: ", info);
    // document.getElementById('lastInfo').innerHTML = info;
  });
}

function deposit() {
  time = document.getElementById("timeText").value
  txVal = document.getElementById("setDeposit").value;
  txValHex = web3.utils.toHex(web3.utils.toWei(txVal,'ether')),

  contract.methods.deposit (parseInt(time)).send( {from: account, value: txValHex}).then( function(tx) {
    console.log("Transaction: ", tx);
  });
}

function withdraw() {
  // info = $("#newInfo").val();
  txVal = web3.utils.toHex(web3.utils.toWei('0.0001','ether')),
  contract.methods.withdraw ().send( {from: account}).then( function(tx) {
    console.log("Transaction: ", tx);
  });
  $("#newInfo").val('');
}