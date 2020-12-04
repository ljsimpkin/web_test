async function getAccount() {
  var success = null;
  //importing web3
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    try {
        // ask user for permission
        ethereum.enable()
        success = 1
        // user approved permission
    } catch (error) {
        // user rejected permission
        console.log('user rejected permission')
        success = 0
    }
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    success = 1
    // no need to ask for permission
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    success = 0
  }
    if (success){
      console.log (window.web3.currentProvider)
    }
  return(success)
}

var contractAddress = '0x7ac4ccdae6b8d2509501ffe680932bfd92d92bd3';
var abi = moneyMotivate;
var contract = [];
var account;

//contract instance
async function connectWallet(){
  var pass = await getAccount();
  if (pass){
    var x = document.getElementById("ether");
    x.classList.toggle("toggle");

    contract = new web3.eth.Contract(abi, contractAddress);

    //load and refresh account on change
    // ethereum.on('accountsChanged', function (accounts) {
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
        document.getElementById("account").innerHTML = accounts[0];
        var x = document.getElementById("account");
        x.classList.toggle("toggleAccounts");
        console.log('Account: ' + account);
        web3.eth.defaultAccount = account;
      });
    // });
    
  }
  console.log("pass =", pass);
}