let config = {
    urlNodeBlockchain: "url node blockchain rpc", // node blockchain rpc support ipc/http/wss, format INPUT is TEXT.
    encryptTextFromWallet: "result encrypt wallet", // AES encrypted text of your privatekey or wallet mnemonic, format INPUT is TEXT.
    allAddress: {
        addressPresale: "0x8B4834405051912be1998D3181A5DE46966d5b23", // address presale to your send coin, format INPUT is address.
        addressPathSwap: ["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0xe9e7cea3dedca5984780bafc599bd69add087d56"], // address path swap, format INPUT is ARRAY(address).
        storingAddressAboutBot: [] // dont change on this, scrool above to add or change data
    },
    transaction: {
        gwei: "auto", // gwei your transaction, format INPUT is NUMBER, TEXT(auto, high).
        amount: "0.00001", // amount your transaction. format INPUT is NUMBER, TEXT(auto).
        gasLimit: "300000", // gaslimit your transaction. format INPUT is NUMBER.
        waitTxStatus: "disable", // wait transaction status success or failed, set this to "enable" to active speedup tx on gwei high. format INPUT is TEXT(enable, disable).
        slippage: "10", // slippage tx tolerance, set 0 for unlimited slippage, format INPUT is NUMBER.

        botsniper: {
            /**
             * set gwei for botsniper :
             * - "auto" = bot will send your tx with number of gwei standard blockchain but not top 1 in block.
             * - "high" = bot will send your tx will be at position 1 in the block.
             * - NUMBER = bot will process your tx according to that number.
             * 
             * the settings that need to be set in this file config.js to run botsniper :
             * - urlNodeBlockchain
             * - encryptTextFromWallet
             * - allAddress
             * - transaction/gwei
             * - transaction/amount
             * - transaction/gasLimit
             * - transaction/waitTxStatus
             * - botsniper/optionSwap or botsniper/optionAutoTradeSellTokenOnly or botsniper/optionPresale
             */
            intervalCheck: "2000", // input time mileseconds for simulateTransaction, format INPUT is NUMBER.
            optionSwap: {
                /**
                 * set amount for swap :
                 * - "auto" = bot will send your tx with the swap value of all balance.
                 * - NUMBER = bot will send your tx swap with this amount.
                 */
                buy: {
                    targetBulk: "1", // target bulk for swap, this method using SCRIPT to send bulk transaction with different transaction (OFF-CHAIN), format INPUT is NUMBER.
                    timeout: "disable", // delay seconds before buy token for bypass antibot on token, format INPUT is NUMBER, TEXT(disable).
                },
                sell: {
                    // [autoTradeSellToken]. if you use "takeprofit" or "cutlose" you must be set "useSellToken" to enable
                    useSellToken: "disable", // set enable and bot will sell token after buy token, format INPUT is TEXT(enable, disable).
                    takeprofit: "2", // percentage increase in token price, format INPUT is NUMBER, TEXT(disable).
                    cutlose: "20", // percentage decrease in token price, max 100, format INPUT is NUMBER, TEXT(disable).
                }
            },
            optionAutoTradeSellTokenOnly: {
                /**
                 * use the autoTradeSellToken feature directly without having to swap in this bot
                 * 
                 * set amount for autoTradeSellTokenOnly :
                 * - "auto" = not support.
                 * - NUMBER = bot will use that amount to set the TOKEN_0 capital benchmark and the bot will take the price of all TOKEN_1 and compare it with the set TOKEN_0 capital, if the price you get exceeds the TOKEN_0 capital then it's PROFIT and vice versa then it's LOSE.
                 */
                takeprofit: "2", // percentage increase in token price, format INPUT is NUMBER.
                cutlose: "10", // percentage decrease in token price, max 100, format INPUT is NUMBER.
            },
            optionPresale: {
                /**
                 * set amount for presale :
                 * - "auto" = not support.
                 * - NUMBER = bot will send your tx send coin with this amount.
                 */
                methodId: "0xd7bb99ba", // method id must start at 0x, this function will send your transaction according to this method id. format INPUT is TEXT
            }
        },

        botexploit: {
            /**
             * mempool "default" only work on network. 
             * mainnet : BSC, ETH, FTM, MATIC, POLYGON, XDAI
             * testnet : ROPSTEN, RINKEBY, GOERLY, KOVAN
             * default-05dfdc01-d98e-4f6b-b896-b24fdc2c601d
             */
            usedMempool: "custom", // if you want to use your blockchain node url as mempool filter and send transaction set this to "custom" and if you want to use mempool filter from default of this bot and then set to "default-YOUR_KEY", format INPUT is TEXT(custom, default-xxxxxxx)
            modeFilter: "double", // if you set this to "double" system will double filter mempool, modeFilter "double", format INPUT is TEXT(single, double).
            optionBackrun: {
                /**
                 * note :
                 * - if you set the "filterMethodId" with the addLiquidity method or addLiquidityETH, bot will automatically filter the target token that will add liquidity from "addressPathSwap = last order"
                 * - if you set the "filterAddress" value but the "filterMethod" is not set then the bot will swap if the address in filterAddress performs a method other than: transfer, transferFrom, approve, mint, burn
                 * - if you set useCustomRouter to "enable" bot will process "targetBulk" in 1 transaction (ON-CHAIN)
                 * - if you set useCustomRouter to "disable" bot will process "targetBulk" in different transaction (OFF-CHAIN)
                 * - if you set useCustomRouter to "enable" and set gwei to "high" bot will use automatic chiGasToken
                 * - you must set "filterAddress" if using backrun
                 * 
                 * set gwei for backrun :
                 * - "auto" = bot will send your tx with same number of gwei target tx but not top 1 in block.
                 * - "high" = bot will send your tx above the target tx and your tx will be at position 1 in the block but your tx position is different by 1 blockNumber with the tx target.
                 * - NUMBER = bot will process your tx according to that number.
                 * 
                 * set amount for backrun :
                 * - "auto" = bot will send your tx with the swap value of all balance.
                 * - NUMBER = bot will send your tx swap with this amount.
                 * 
                 * the settings that need to be set in this file configuration to run backrun :
                 * - urlNodeBlockchain
                 * - encryptTextFromWallet
                 * - allAddress
                 * - transaction/gwei
                 * - transaction/amount
                 * - transaction/gasLimit
                 * - transaction/waitTxStatus
                 * - transaction/botexploit/use
                 * - transaction/botexploit/key
                 * - transaction/botexploit/backrun
                 */
                mode: "normal", // the "fast" set only supports the gwei NUMBER set type and if it is activated it doesn't support running multiple bots, format INPUT is TEXT(normal, fast).
                targetBulk: "1", // if you set "useCustomRouter" to "enable" then the bot will send bulk transaction with CUSTOM ROUTER and will do it in 1 transaction, vice versa bot will send bulk transaction with SCRIPT and will do it in different transactions, format INPUT is NUMBER
                filterMethodId: [], // method id must start at 0x and have a length of 10, format INPUT is TEXT
                filterAddress: ["0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"], // filter transaction address on object "to", format INPUT is address
                useCustomRouter: "disable", // if you want to use customRouter set this to "enable", format INPUT is TEXT(enable, disable)
            },
            optionSandwich: {
                /**
                 * note : 
                 * - if you set useCustomRouter to "enable" and set gwei to "high" bot will use automatic chiGasToken
                 * 
                 * set gwei for sandwich : 
                 * - "auto" = bot will send your tx above target tx but not top 1 in block.
                 * - "high" = bot will send your tx above target tx and your tx will be in position 1 is block and bot will use chiGasToken for reduce your transaction fee.
                 * - NUMBER = bot will send your tx above the target tx by multiplying the target tx by the specified number, it will probably be in the top 1 block.
                 * 
                 * set amount for sandwich :
                 * - "auto" = bot will send your tx with the swap value according to the automatic profit calculation.
                 * - NUMBER = not support.
                 * 
                 * the settings that need to be set in this file config.js to run sandwich :
                 * - urlNodeBlockchain
                 * - encryptTextFromWallet
                 * - allAddress
                 * - transaction/gwei
                 * - transaction/amount
                 * - transaction/gasLimit
                 * - transaction/waitTxStatus
                 * - transaction/botexploit/use
                 * - transaction/botexploit/key
                 * - transaction/botexploit/sandwich
                 */
                minimumProfitAmount: "0", // the minimum amount of profit in the number of tokens used to buy [TOKEN_0], format INPUT is NUMBER.
                cancelTxIfDifferentblock: "disable", // [EXPERIMENTAL] cancel your buy and sell transaction if the victim's blockNumber is smaller than your first tx (buy), format INPUT is TEXT(enable, disable).
                useCustomRouter: "enable", // must be set "enable" dont change, format INPUT is TEXT(enable, disable)
            },
            optionBuyBulk: {
                /**
                 * note :
                 * - all transactions in buybulk will be processed OFF-CHAIN ​​even though using a customRouter.
                 * - if you set useCustomRouter to "enable" and set gwei to "high" bot will use automatic chiGasToken
                 * 
                 * set gwei for buybulk :
                 * - "auto" = bot will send your tx with standard amount from blockchain but not top 1 in block.
                 * - "high" = bot will send your tx will be in position 1 in block.
                 * - NUMBER = bot will process your tx according to that number.
                 * 
                 * set amount for buybulk :
                 * - "auto" = bot will send your tx with the swap value of all balance.
                 * - NUMBER = bot will send your tx swap with this amount.
                 * 
                 * the settings that need to be set in this file configuration to run the buyBulk :
                 * - urlNodeBlockchain
                 * - encryptTextFromWallet
                 * - allAddress
                 * - transaction/gwei
                 * - transaction/amount
                 * - transaction/gasLimit
                 * - transaction/waitTxStatus
                 * - transaction/botexploit/buyBulk
                 */
                stopIfSuccessEntered: "disable", // if this set to enable bot will automatically stop if the token has been successfully entered into the wallet. format INPUT is TEXT(enable, disable).
                delayPerTx: "2300", // milesecond delay for each transaction, format INPUT is NUMBER, TEXT(disable).
                targetBulk: "1", // target bulk your tx, format INPUT is NUMBER.
                useCustomRouter: "enable", // if you want to use customRouter set this to "enable", format INPUT is TEXT(enable, disable)
            },
        },

        botdeveloper: {
            byteCodeContract: "60806040523480156200001157600080fd5b506000620000276001600160e01b036200014016565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35060408051808201909152600a80825269212aa9a2102a37b5b2b760b11b6020909201918252620000a49160069162000145565b5060408051808201909152600480825263109554d160e21b6020909201918252620000d29160059162000145565b506004805460ff191660121790556a19a4815e0ad0c67f0000006003819055336000818152600160209081526040808320859055805194855251929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a3620001e7565b335b90565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200018857805160ff1916838001178555620001b8565b82800160010185558215620001b8579182015b82811115620001b85782518255916020019190600101906200019b565b50620001c6929150620001ca565b5090565b6200014291905b80821115620001c65760008155600101620001d1565b61113d80620001f76000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c8063893d20e8116100ad578063a9059cbb11610071578063a9059cbb1461035a578063b09f126614610386578063d28d88521461038e578063dd62ed3e14610396578063f2fde38b146103c45761012c565b8063893d20e8146102dd5780638da5cb5b1461030157806395d89b4114610309578063a0712d6814610311578063a457c2d71461032e5761012c565b806332424aa3116100f457806332424aa31461025c578063395093511461026457806342966c681461029057806370a08231146102ad578063715018a6146102d35761012c565b806306fdde0314610131578063095ea7b3146101ae57806318160ddd146101ee57806323b872dd14610208578063313ce5671461023e575b600080fd5b6101396103ea565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561017357818101518382015260200161015b565b50505050905090810190601f1680156101a05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101da600480360360408110156101c457600080fd5b506001600160a01b038135169060200135610480565b604080519115158252519081900360200190f35b6101f661049d565b60408051918252519081900360200190f35b6101da6004803603606081101561021e57600080fd5b506001600160a01b038135811691602081013590911690604001356104a3565b610246610530565b6040805160ff9092168252519081900360200190f35b610246610539565b6101da6004803603604081101561027a57600080fd5b506001600160a01b038135169060200135610542565b6101da600480360360208110156102a657600080fd5b5035610596565b6101f6600480360360208110156102c357600080fd5b50356001600160a01b03166105b1565b6102db6105cc565b005b6102e5610680565b604080516001600160a01b039092168252519081900360200190f35b6102e561068f565b61013961069e565b6101da6004803603602081101561032757600080fd5b50356106ff565b6101da6004803603604081101561034457600080fd5b506001600160a01b03813516906020013561077c565b6101da6004803603604081101561037057600080fd5b506001600160a01b0381351690602001356107ea565b6101396107fe565b61013961088c565b6101f6600480360360408110156103ac57600080fd5b506001600160a01b03813581169160200135166108e7565b6102db600480360360208110156103da57600080fd5b50356001600160a01b0316610912565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104765780601f1061044b57610100808354040283529160200191610476565b820191906000526020600020905b81548152906001019060200180831161045957829003601f168201915b5050505050905090565b600061049461048d610988565b848461098c565b50600192915050565b60035490565b60006104b0848484610a78565b610526846104bc610988565b6105218560405180606001604052806028815260200161100e602891396001600160a01b038a166000908152600260205260408120906104fa610988565b6001600160a01b03168152602081019190915260400160002054919063ffffffff610bd616565b61098c565b5060019392505050565b60045460ff1690565b60045460ff1681565b600061049461054f610988565b846105218560026000610560610988565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff610c6d16565b60006105a96105a3610988565b83610cce565b506001919050565b6001600160a01b031660009081526001602052604090205490565b6105d4610988565b6000546001600160a01b03908116911614610636576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b600061068a61068f565b905090565b6000546001600160a01b031690565b60058054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104765780601f1061044b57610100808354040283529160200191610476565b6000610709610988565b6000546001600160a01b0390811691161461076b576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6105a9610776610988565b83610dca565b6000610494610789610988565b846105218560405180606001604052806025815260200161107f60259139600260006107b3610988565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff610bd616565b60006104946107f7610988565b8484610a78565b6005805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156108845780601f1061085957610100808354040283529160200191610884565b820191906000526020600020905b81548152906001019060200180831161086757829003601f168201915b505050505081565b6006805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156108845780601f1061085957610100808354040283529160200191610884565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b61091a610988565b6000546001600160a01b0390811691161461097c576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61098581610ebc565b50565b3390565b6001600160a01b0383166109d15760405162461bcd60e51b8152600401808060200182810382526024815260200180610fc46024913960400191505060405180910390fd5b6001600160a01b038216610a165760405162461bcd60e51b81526004018080602001828103825260228152602001806110e76022913960400191505060405180910390fd5b6001600160a01b03808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316610abd5760405162461bcd60e51b8152600401808060200182810382526025815260200180610f9f6025913960400191505060405180910390fd5b6001600160a01b038216610b025760405162461bcd60e51b815260040180806020018281038252602381526020018061105c6023913960400191505060405180910390fd5b610b4581604051806060016040528060268152602001611036602691396001600160a01b038616600090815260016020526040902054919063ffffffff610bd616565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610b7a908263ffffffff610c6d16565b6001600160a01b0380841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610c655760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610c2a578181015183820152602001610c12565b50505050905090810190601f168015610c575780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610cc7576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b038216610d135760405162461bcd60e51b81526004018080602001828103825260218152602001806110a46021913960400191505060405180910390fd5b610d56816040518060600160405280602281526020016110c5602291396001600160a01b038516600090815260016020526040902054919063ffffffff610bd616565b6001600160a01b038316600090815260016020526040902055600354610d82908263ffffffff610f5c16565b6003556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b6001600160a01b038216610e25576040805162461bcd60e51b815260206004820152601f60248201527f42455032303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b600354610e38908263ffffffff610c6d16565b6003556001600160a01b038216600090815260016020526040902054610e64908263ffffffff610c6d16565b6001600160a01b03831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b038116610f015760405162461bcd60e51b8152600401808060200182810382526026815260200180610fe86026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000610cc783836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610bd656fe42455032303a207472616e736665722066726f6d20746865207a65726f206164647265737342455032303a20617070726f76652066726f6d20746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737342455032303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636542455032303a207472616e7366657220616d6f756e7420657863656564732062616c616e636542455032303a207472616e7366657220746f20746865207a65726f206164647265737342455032303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f42455032303a206275726e2066726f6d20746865207a65726f206164647265737342455032303a206275726e20616d6f756e7420657863656564732062616c616e636542455032303a20617070726f766520746f20746865207a65726f2061646472657373a265627a7a7231582071e0c183217ae3e9a1406ae7b58c2f36e09f2b16b10e19d46ceb821f3ee6abad64736f6c63430005100032", // byte code contract result from compile, format INPUT is TEXT.
            createTokenPlusAddLiqudity: {
                /**
                 * note :
                 * only work addLiqudity using token not coin
                 * 
                 * how the createTokenPlusAddLiqudity feature works : 
                 * 1. bot will create and deploy token to blockchain
                 * 2. after execute number 1, bot will addLiqudity on same blockNumber with deployed token transaction
                 * 
                 * about gwei for createTokenPlusAddLiqudity :
                 * 1. if you set gwei to "auto" then bot will send your tx above target tx but not top 1 in block
                 * 2. if you set gwei to "high" then bot will send your tx above target tx and your tx will be in position 1 is block
                 * 3. if you set gwei to number then the bot will send your tx above the target tx by multiplying the target tx by the specified number, it will probably be in the top 1 block
                 */
                amountPairLiqudity: "10000",
            },
            createTokenPlusAddLiqudityPlusBackrun: {
                none: "",
            },
            createTokenPlusAddLiqudityPlusRemoveLiqudity: {
                none: "",
            },
        }
    }
};


let networkBasedEth = [
    {
        chainid: "1", // network ethereum (ETH)
        wrappedCoin: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        chiGasToken: "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c",
        customRouter: "none",
        dexAddress: [
            { name: "UniswapV2", address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d" }
        ]
    },
    {
        chainid: "25", // network cronos (CRO)
        wrappedCoin: "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23",
        chiGasToken: "none",
        customRouter: "none",
        dexAddress: [
            { name: "CrodexV2", address: "0xeC0A7a0C2439E8Cb67b992b12ecd020Ea943c7Be" },
            { name: "crona", address: "0xcd7d16fB918511BF7269eC4f48d61D79Fb26f918" },
            { name: "empire", address: "0xdADaae6cDFE4FA3c35d54811087b3bC3Cd60F348" },
            { name: "vvs", address: "0x145863Eb42Cf62847A6Ca784e6416C1682b1b2Ae" },
            { name: "crodex", address: "0xeC0A7a0C2439E8Cb67b992b12ecd020Ea943c7Be" },
            { name: "elk", address: "0xdB02A597b283eACb9436Cd2a2d15039a11A3299d" },
            { name: "chrono", address: "0x5bFc95C3BbF50579bD57957cD074fa96a4d5fF9F" },
            { name: "smol", address: "0x8118DD9fED86523Bf724e2EC5f56055Da0668AF4" },
            { name: "swapp", address: "0x600d0b65C2A25b64C9b517A43B7a44592448d285" },
            { name: "photon", address: "0x69004509291F4a4021fA169FafdCFc2d92aD02Aa" },
            { name: "annex", address: "0x4B6AAD4162dd0D75aF626385f18839fF067FA6fE" },
            { name: "kyber", address: "0xEaE47c5D99f7B31165a7f0c5f7E0D6afA25CFd55" },
            { name: "madmeerkat", address: "0x145677FC4d9b8F19B5D56d1820c48e0443049a30" },
            { name: "ducky", address: "0x28a10fE91d4a8D0637999a903eEf9Ad5b1D9947C" },
            { name: "crowfi", address: "0xd30d3aC04E2325E19A2227cfE6Bc860376Ba20b1" },
            { name: "agile", address: "0x9AadB4A3BFaCff8aa60a2c63735Cb8B94De7C57d" },
            { name: "krypto", address: "0xDE25A2d1AD885aF4df667132f2214b920b225e52" },
        ]
    },
    {
        chainid: "56", // network binance smart chain (BNB)
        wrappedCoin: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
        chiGasToken: "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c",
        customRouter: "0x843655BD21F33ef4Fb249A82e82ADD1d14d59ECB",
        dexAddress: [
            { name: "PancakeSwapV2", address: "0x10ED43C718714eb63d5aA57B78B54704E256024E" },
            { name: "bakery", address: "0xcde540d7eafe93ac5fe6233bee57e1270d3e330f" },
            { name: "ape", address: "0xcf0febd3f17cef5b47b0cd257acf6025c5bff3b7" },
            { name: "mdex", address: "0x7dae51bd3e3376b8c7c4900e9107f12be3af1ba8" },
            { name: "jliquidity", address: "0xbd67d157502a23309db761c41965600c2ec788b2" },
            { name: "baby", address: "0x325e343f1de602396e256b67efd1f61c3a6b38bd" },
            { name: "sushi", address: "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506" },
            { name: "kyber", address: "0x78df70615ffc8066cc0887917f2Cd72092C86409" },
            { name: "coinone", address: "0x867254aF06801C21C5812690a5c3FAd82537C6Dc" },
            { name: "shibanova", address: "0x251912dE998ec91DFDf67EfBe032d6f4aB5EC485" },
            { name: "empire", address: "0xdADaae6cDFE4FA3c35d54811087b3bC3Cd60F348" },
            { name: "bi", address: "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8" },
            { name: "wault", address: "0xD48745E39BbED146eEC15b79cBF964884F9877c2" },
            { name: "pad", address: "0x60Ca5ed40957607D6f15688d5bc693f008210058" },
            { name: "sheep", address: "0xc1d62747a2DdD3a2C228842ED7A469D5c1B840Ab" },
            { name: "mochi", address: "0xa8cC4B94624B31465e777f06ee3591fd5AFe5821" },
            { name: "jet", address: "0xBe65b8f75B9F20f4C522e0067a3887FADa714800" },
            { name: "acy", address: "0x4DCa8E42634abdE1925ebB7f82AC29Ea00d34bA2" },
            { name: "firebird", address: "0xF6fa9Ea1f64f1BBfA8d71f7f43fAF6D45520bfac" },
            { name: "Fstswap", address: "0x1B6C9c20693afDE803B27F8782156c0f892ABC2d" },
            { name: "MarsSwap", address: "0xb68825C810E67D4e444ad5B9DeB55BA56A66e72D" },
            { name: "Safeswap", address: "0xE804f3C3E6DdA8159055428848fE6f2a91c2b9AF" },
            { name: "Elk", address: "0xA63B831264183D755756ca9AE5190fF5183d65D6" },
        ]
    },
    {
        chainid: "97", // network binance smart chain (BNB) (TESTNET)
        wrappedCoin: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
        chiGasToken: "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c",
        customRouter: "0x2f4853c32b895Ee80Ba87d134d9F4a116e2C7408",
        dexAddress: [
            { name: "PancakeSwapV2 TESTNET", address: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3" },
        ]
    },
    {
        chainid: "137", // network polygon (MATIC)
        wrappedCoin: "0xAcc15dC74880C9944775448304B263D191c6077F",
        chiGasToken: "none",
        customRouter: "none",
        dexAddress: [
            { name: "quick", address: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff" },
            { name: "sushi", address: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" },
            { name: "dfyn", address: "0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429" },
            { name: "ape", address: "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607" },
            { name: "wault", address: "0x3a1D87f206D12415f5b0A33E786967680AAb4f6d" },
            { name: "jet", address: "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923" },
            { name: "kyber", address: "0x546C79662E028B661dFB4767664d0273184E4dD1" },
            { name: "empire", address: "0xdADaae6cDFE4FA3c35d54811087b3bC3Cd60F348" },
            { name: "univ3poly", address: "0xE592427A0AEce92De3Edee1F18E0157C05861564" },
            { name: "polycat", address: "0x277FEf984D1115a6f543d3D65A2d138faF1db856" },
            { name: "gravity", address: "0x02bc4F42b998FC23355c780A756446d9998d78dE" },
            { name: "firebird", address: "0xF6fa9Ea1f64f1BBfA8d71f7f43fAF6D45520bfac" },
            { name: "acy", address: "0x4DCa8E42634abdE1925ebB7f82AC29Ea00d34bA2" },
        ]
    },
    {
        chainid: "250", // network fantom (FTM)
        wrappedCoin: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
        chiGasToken: "none",
        customRouter: "none",
        dexAddress: [
            { name: "spooky", address: "0xf491e7b69e4244ad4002bc14e878a34207e38c29" },
            { name: "paint", address: "0xfd000ddcea75a2e23059881c3589f6425bff1abb" },
            { name: "empire", address: "0xdADaae6cDFE4FA3c35d54811087b3bC3Cd60F348" },
            { name: "spirit", address: "0x16327e3fbdaca3bcf7e38f5af2599d2ddc33ae52" },
            { name: "fbomb", address: "0xD9473A05b2edf4f614593bA5D1dBd3021d8e0Ebe" },
            { name: "sushi", address: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4" },
            { name: "shiba", address: "0xB6f7b3d8CD9dBf30805C0dd79809dace5603Ce6A" },
            { name: "kyber", address: "0x5d5A5a0a465129848c2549669e12cDC2f8DE039A" },
            { name: "soul", address: "0x6b3d631B87FE27aF29efeC61d2ab8CE4d621cCBF" },
            { name: "jet", address: "0x845E76A8691423fbc4ECb8Dd77556Cb61c09eE25" },
            { name: "morpheus", address: "0x8aC868293D97761A1fED6d4A01E9FF17C5594Aa3" },
            { name: "wing", address: "0x2b660040b289B1B570E053b21dd9A6F1067AD7F5" },
            { name: "elk", address: "0x4D2cf285a519261F30b4d9c2c344Baf260d65Fa2" },
            { name: "defy", address: "0x4a634281D3C2aF3a21469f2Ba1ad47b59dA8b752" },
            { name: "firebird", address: "0xF6fa9Ea1f64f1BBfA8d71f7f43fAF6D45520bfac" },
            { name: "fantomlive", address: "0xeF37DC7fdDdFa03d536C845bc19a55b2CaE76278" },
            { name: "dexbfcba7", address: "0x5023882f4d1ec10544fcb2066abe9c1645e95aa0" },
        ]
    },
    {
        chainid: "1284", // network moonbeam (GLMR)
        wrappedCoin: "0xAcc15dC74880C9944775448304B263D191c6077F",
        chiGasToken: "none",
        customRouter: "none",
        dexAddress: [
            { name: "BeamSwapV2", address: "0x96b244391d98b62d19ae89b1a4dccf0fc56970c7" },
            { name: "StellaSwapV2", address: "0xd0A01ec574D1fC6652eDF79cb2F880fd47D34Ab1" }
        ]
    },
    {
        chainid: "43114", // network avalanche (AVAX)
        wrappedCoin: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
        chiGasToken: "none",
        customRouter: "none",
        dexAddress: [
            { name: "traderjoe", address: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4" },
            { name: "pangolin", address: "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106" },
            { name: "lydia", address: "0xA52aBE4676dbfd04Df42eF7755F01A3c41f28D27" },
            { name: "hurricane", address: "0xb9a9BB6CC39387548BAA7185fbFf51d47eef8771" },
            { name: "elk", address: "0x9E4AAbd2B3E60Ee1322E94307d0776F2c8e6CFbb" },
            { name: "sushi", address: "0xC4729E56b831d74bBc18797e0e17A295fA77488c" },
            { name: "yeti", address: "0x262DcFB36766C88E6A7a2953c16F8defc40c378A" },
            { name: "party", address: "0xB2c835d90E96203Ba940462145AEB61481443605" },
            { name: "storm", address: "0xA05728c5F9e4B30C66033C429bBdB5279e399d21" },
            { name: "baguette", address: "0xf8C7F3f754709a7A4353fB647C3aAb6B1b0c84aD" },
            { name: "olive", address: "0x0c45FB63001b56a21e29c7dcc1727bfDA273a368" },
            { name: "dct", address: "0xFBA564939397e71c75c9CbB29E6E23b89e4272BE" },
            { name: "canary", address: "0x06f8ED60393AC6A4B16900273C9313222dfe9940" },
            { name: "empire", address: "0xd12CB7ccD5423D287A429B3528D3a1d16b7f50AF" },
            { name: "mumu", address: "0x39ab3084353eBDd3E595A48599dDB982Cc1451ba" },
            { name: "complus", address: "0x78c18E6BE20df11f1f41b9635F3A18B8AD82dDD1" },
            { name: "bao", address: "0xb7453127E28EE32f97fbA7a4E990de6C92C8aC50" },
            { name: "unify", address: "0xBd562d5cF2c62Da3143D862aF39eDb6dF59A4679" },
            { name: "thorus", address: "0xb5b2444eDF79b00d40f463f79158D1187a0D0c25" },
            { name: "kyber", address: "0x8Efa5A9AD6D594Cf76830267077B78cE0Bc5A5F8" },
        ]
    }
];

config.allAddress.storingAddressAboutBot = [...networkBasedEth];
module.exports = config;
