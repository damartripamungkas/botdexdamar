module.exports = {
    urlNodeBlockchain: "url node blockchain", // node blockchain rpc support ipc/http/wss  |  format INPUT is TEXT.
    encryptTextFromWallet: "encrypted text wallet", // AES encrypted text of your privatekey or wallet mnemonic  |  format INPUT is TEXT.
    allAddress: {
        /**
         * about addressPathSwap :
         * 
         *  example if you want to buy XXX tokens with the WBNB token pair then follow the method below
         *      formula = addressPathSwap: [address WBNB, address XXX]
         *      example = addressPathSwap: ["0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", "0x12bb890508c125661e03b09ec06e404bc9289040"]
         * 
         *  example if you want to buy XXX tokens with a WBNB token pair but you want to use BUSD to buy it then follow the method below
         *      formula = addressPathSwap: [address BUSD, address WBNB, address XXX]
         *      example = addressPathSwap: ["0xe9e7cea3dedca5984780bafc599bd69add087d56", "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", "0x12bb890508c125661e03b09ec06e404bc9289040"]
         */
        addressPathSwap: ["0xae13d989dac2f0debff460ac112a837c89baa7cd", "0x68b44f80e2f2467f434cad4b995b8df174b665d1"], // address path swap  |  format INPUT is ARRAY(address).
    },
    transaction: {
        gwei: "5", // gwei your transaction  |  format INPUT is NUMBER, TEXT(auto, high).
        amount: "0.00001", // amount your transaction  |  format INPUT is NUMBER, TEXT(auto).
        gasLimit: "300000", // gaslimit your transaction  |  format INPUT is NUMBER.
        waitTxStatus: "disable", // wait transaction status success or failed, set this to "enable" to active speedup tx on gwei high  |  format INPUT is TEXT(enable, disable).
        slippage: "0", // slippage tx tolerance, set 0 for unlimited slippage  |  format INPUT is NUMBER.

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
            intervalCheck: "2000", // input time mileseconds for simulateTransaction  |  format INPUT is NUMBER.
            optionSwap: {
                /**
                 * set amount for swap :
                 * - "auto" = bot will send your tx with the swap value of all balance.
                 * - NUMBER = bot will send your tx swap with this amount.
                 */
                buy: {
                    targetBulk: "1", // target bulk for swap, this method using SCRIPT to send bulk transaction with different transaction (OFF-CHAIN)  |  format INPUT is NUMBER.
                    timeout: "disable", // delay seconds before buy token for bypass antibot on token  |  format INPUT is NUMBER, TEXT(disable).
                },
                sell: {
                    // [autoTradeSellToken]. if you want use "takeprofit" and "cutlose" you must be set "useSellToken" to enable
                    useSellToken: "enable", // set enable and bot will sell token after buy token  |  format INPUT is TEXT(enable, disable).
                    takeprofit: "10000", // percentage increase in token price  |  format INPUT is NUMBER.
                    cutlose: "20", // percentage decrease in token price, max 100  |  format INPUT is NUMBER.
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
                takeprofit: "10000", // percentage increase in token price  |  format INPUT is NUMBER.
                cutlose: "20", // percentage decrease in token price, max 100  |  format INPUT is NUMBER.
            },
            optionPresale: {
                /**
                 * set amount for presale :
                 * - "auto" = not support.
                 * - NUMBER = bot will send your tx send coin with this amount.
                 */
                methodId: "0xd7bb99ba", // method id must start at 0x, this function will send your transaction according to this method id  |  format INPUT is TEXT.
                addressPresale: "0x8B4834405051912be1998D3181A5DE46966d5b23", // address presale to your send coin  |  format INPUT is address.
            }
        },

        botexploit: {
            /**
             * mempool "default" only work on network. 
             * mainnet : BSC, ETH, FTM, MATIC, POLYGON, XDAI
             * testnet : ROPSTEN, RINKEBY, GOERLY, KOVAN
             */
            usedMempool: "default-05dfdc01-d98e-4f6b-b896-b24fdc2c601d", // if you want to use your blockchain node url as mempool filter and send transaction set this to "custom-single" or "custom-multi" and if you want to use mempool filter from default of this bot and then set to "default-YOUR_KEY"  |  format INPUT is TEXT(custom, default-xxxxxxx)
            trafficLog: "disable", // view traffic on log  |  format INPUT is TEXT(enable, disable).
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
                mode: "fast", // the "fast" set only supports the gwei NUMBER set type and if it is activated it doesn't support running multiple bots  |  format INPUT is TEXT(normal, fast).
                targetBulk: "1", // if you set "useCustomRouter" to "enable" then the bot will send bulk transaction with CUSTOM ROUTER and will do it in 1 transaction, vice versa bot will send bulk transaction with SCRIPT and will do it in different transactions  |  format INPUT is NUMBER
                filterMethodId: ["0x2e1a7d4d"], // method id must start at 0x and have a length of 10  |  format INPUT is TEXT
                filterAddress: ["0x0863fFa8c277a6C5C3869Ec7ead6392d3013627d"], // filter transaction address on object "to"  |  format INPUT is address
                useCustomRouter: "disable", // if you want to use customRouter set this to "enable"  |  format INPUT is TEXT(enable, disable)
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
                txfee: "0.25", // tx fee default swap dex, pancakeswap = 0.25, uniswap = 0.30  |  format INPUT is TEXT(0.25, 0.30).
                minimumProfitAmount: "0", // the minimum amount of profit in the number of tokens used to buy [TOKEN_0]  |  format INPUT is NUMBER.
                cancelTxIfDifferentblock: "disable", // [EXPERIMENTAL] cancel your buy and sell transaction if the victim's blockNumber is smaller than your first tx (buy)  |  format INPUT is TEXT(enable, disable).
                useCustomRouter: "enable", // must be set "enable" dont change  |  format INPUT is TEXT(enable, disable)
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
                stopIfSuccessEntered: "disable", // if this set to enable bot will automatically stop if the token has been successfully entered into the wallet  |  format INPUT is TEXT(enable, disable).
                delayPerTx: "2300", // milesecond delay for each transaction  |  format INPUT is NUMBER, TEXT(disable).
                targetBulk: "1", // target bulk your tx  |  format INPUT is NUMBER.
                useCustomRouter: "enable", // if you want to use customRouter set this to "enable"  |  format INPUT is TEXT(enable, disable)
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
