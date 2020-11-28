//Smart contract functions
function checkYourBalance() {
  contract.methods.checkYourBalance().call({from: account}).then( function( info ) {
    console.log("call info: ", info);
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
  txVal = web3.utils.toHex(web3.utils.toWei('0.0001','ether')),
  contract.methods.withdraw ().send( {from: account}).then( function(tx) {
    console.log("Transaction: ", tx);
  });
}