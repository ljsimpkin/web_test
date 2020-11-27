const enableEthereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const createContractButton = document.querySelector('.createContractButton');
const sendEthButton = document.querySelector('.sendEthButton');
const createWithDrawButton = document.querySelector('.withDrawButton');

let contractHash = [];
let accounts = [];
let contractAddress = [];

//js web3 might be diff from node js? makes scanning contract work
const web3 = new Web3("https://ropsten.infura.io/v3/c10bab6a93094cd680fdce52a4aaa48e");

//contract bytecode
const compiledContract = '608060405234801561001057600080fd5b50610536806100206000396000f3fe6080604052600436106100555760003560e01c806307de97351461005a57806311c52f5c146100e3578063267c68e01461010e5780633ccfd60b14610139578063a99dca3f14610150578063b6b55f25146101e0575b600080fd5b34801561006657600080fd5b506100a96004803603602081101561007d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061020e565b604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390f35b3480156100ef57600080fd5b506100f8610258565b6040518082815260200191505060405180910390f35b34801561011a57600080fd5b506101236102a2565b6040518082815260200191505060405180910390f35b34801561014557600080fd5b5061014e6102a8565b005b34801561015c57600080fd5b506101656103d0565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101a557808201518184015260208101905061018a565b50505050905090810190601f1680156101d25780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61020c600480360360208110156101f657600080fd5b810190808035906020019092919050505061040d565b005b60016020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154905083565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154905090565b60005481565b42600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002015411156102f757600080fd5b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015490503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610384573d6000803e3d6000fd5b506000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001018190555050565b60606040518060400160405280600b81526020017f48656c6c6f20576f726c64000000000000000000000000000000000000000000815250905090565b6000428201905060405180606001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200134815260200182815250600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201559050506104ea6104ee565b5050565b6001600080828254019250508190555056fea2646970667358221220de79365c0d35ecdcde2ad8f1a2d6ed5cbd4c8569878e2233627b2fff805c7df464736f6c63430007050033'


var depositValue = document.getElementById("setDeposit").value;
// console.log("deposit value = ",depositValue);

var hexDepositValue = web3.utils.toHex(depositValue);
// console.log("hex deposit value = ",hexDepositValue);

// var depositRevert = web3.utils.hexToNumberString("0x38D7EA4C68000");
// console.log("revert = ", depositRevert);



async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  showAccount.innerHTML = accounts;
}

enableEthereumButton.addEventListener('click', () => {
  getAccount();

});

//refresh account when changes
ethereum.on('accountsChanged', function (accounts) {
  getAccount();
});

/*
_________________________________________________________________________
*/



// var methods = 'withdraw(uint256)';
// var hash = Web3.utils.keccak256(signature);
// console.log(hash);
// var fuint256 = '69'
// var hex = web3.utils.numberToHex(fuint256)
// var byte =web3.utils.hexToBytes(hex)

// createWithDrawButton.addEventListener('click', () => {
//   ethereum
//     .request({
//       method: 'eth_sendTransaction',
//       params: [myContract.options]
//       ],
//     })
//     .then((txHash) => console.log(txHash))
//     .catch((error) => console.error);
// });


contractAddress = '0xcC1BDEC818F1C617CF6DB07DCC90700c5A52A4CC';

var myContract = new web3.eth.Contract(moneyMotivate, contractAddress, {
    from: '0x1234567890123456789012345678901234567891', // default from address
});

myContract.options.data = myContract.methods.hi().encodeABI();
console.log("hi = ",  myContract.methods.hi().encodeABI())

var dataABI = web3.eth.abi.encodeFunctionSignature(moneyMotivate[2]);

console.log("tx Object = ", dataABI);

myContract.methods.hi().call().then(function(err, result) {
    console.log("L error: ", error);
    console.log("L Transaction: ", result);
  });


/*
_________________________________________________________________________
*/

// Deploy contract
createContractButton.addEventListener('click', () => {
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
    {
      from: accounts[0],
      gasPrice: '0x2540BE400',
      gasLimit: '0xF4240',
      data: compiledContract,
    },
  ],
    })
    .then((txHash) => {console.log(txHash); contractHash = txHash})
    .catch((error) => console.error);
});

// Sending Ethereum to an address
sendEthButton.addEventListener('click', () => {
  depositValue = document.getElementById("setDeposit").value;
  hexDepositValue = web3.utils.toHex(depositValue);
  console.log(depositValue);
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0xcC1BDEC818F1C617CF6DB07DCC90700c5A52A4CC', //abe's contract
          value: hexDepositValue,
          gasLimit: '0x33450',
          gasPrice: '0x2540BE400',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});

// call Contract Withdraw function
createWithDrawButton.addEventListener('click', () => {
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          gasPrice: '0x2540BE400',
          gasLimit: '0xF4240',
          to: '0xcC1BDEC818F1C617CF6DB07DCC90700c5A52A4CC', //abe's contract
          data: '0x0fdb1c10', // general withdraw
          // data: dataABI, //my withdraw
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});


function startRecieptRequest(){

  var timer = 120;
  var address = null;

  function requestReciept()
  {
    web3.eth.getTransactionReceipt(contractHash, function(err, transaction) {
    }).then(function(receipt) {address = receipt});
  //set minutes and seconds variables based on timer input
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;
  //add 0 so that minutes and seconds always display 2 digits, need to convert to string
    if (minutes < 10){
      minutes = "0".concat(String(minutes));
    }
    if (seconds < 10) {
      seconds = "0".concat(String(seconds));
    }

    document.getElementById("contractMinutesDisplay").innerHTML = minutes;
    document.getElementById("contractSecondsDisplay").innerHTML = seconds;
    timer -= 1;

    if (address != null){
      console.log("address != null, yay");
      console.log("address = ", address);
      clearInterval(stopTimer);
    }

    if (timer < 0){
      console.log("timeout");
      clearInterval(stopTimer);
    }
  }

  var stopTimer = setInterval(requestReciept, 1000);

}


//-------------------------------------------------------

/*
Javascript timer
*/

function startTimer(){

  var timer = timeText.value;

  function myTimer()
  {
  //set minutes and seconds variables based on timer input
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;
  //add 0 so that minutes and seconds always display 2 digits, need to convert to string
    if (minutes < 10){
      minutes = "0".concat(String(minutes));
    }
    if (seconds < 10) {
      seconds = "0".concat(String(seconds));
    }

    document.getElementById("minutesDisplay").innerHTML = minutes;
    document.getElementById("secondsDisplay").innerHTML = seconds;
    timer -= 1;

    if (timer < 0){
      clearInterval(stopTimer);
      document.getElementById("startButton").innerHTML = "Start";
    }

    if( window.innerHeight != screen.height) {
      clearInterval(stopTimer);
      document.getElementById("minutesDisplay").innerHTML = "00";
      document.getElementById("secondsDisplay").innerHTML = "00";
      document.getElementById("startButton").innerHTML = "Start";
    }
  }

  var stopTimer = setInterval(myTimer, 1000);

}

var elem = document.documentElement;

function openFullscreen() {
  startTimer();
  document.getElementById("startButton").innerHTML = "Processing...";
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}