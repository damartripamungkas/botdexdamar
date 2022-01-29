/**
 * edit the configuration below using the help of syntax highlighting to make it easier
 * contact the author to ask questions regarding the configuration below
*/

module.exports = {
    urlNodeBlockchain: "url node rpc blockchain", // node blockchain rpc support ipc/http/wss, format INPUT is TEXT.
    encryptTextFromWallet: "encryption text", // AES encrypted text of your privatekey or wallet mnemonic, format INPUT is TEXT.
    allAddress: {
        addressPresale: "0xae13d989dac2f0debff460ac112a837c89baa7cd", // address presale to your send coin, format INPUT is address.
        addressPathSwap: ["0xae13d989dac2f0debff460ac112a837c89baa7cd", "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7"], // address path swap, format INPUT is ARRAY(address).
        storingAddressAboutBot: [
            {
                chainid: "1", // network ethereum (ETH)
                wrappedCoin: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                chiGasToken: "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c",
                customRouter: "none",
                dexAddress: []
            },
            {
                chainid: "25", // network cronos (CRO)
                wrappedCoin: "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23",
                chiGasToken: "none",
                customRouter: "none",
                dexAddress: []
            },
            {
                chainid: "56", // network binance smart chain (BNB)
                wrappedCoin: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
                chiGasToken: "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c",
                customRouter: "0x00c3bD2BaA40096E79617135A8ee0E18a8BDCEF7",
                dexAddress: [
                    { name: "PancakeSwapV2", address: "0x10ED43C718714eb63d5aA57B78B54704E256024E" },
                ]
            },
            {
                chainid: "97", // network binance smart chain (BNB) (TESTNET)
                wrappedCoin: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
                chiGasToken: "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c",
                customRouter: "none",
                dexAddress: [
                    { name: "PancakeSwapV2", address: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1" },
                ]
            },
            {
                chainid: "137", // network polygon (MATIC)
                wrappedCoin: "0xAcc15dC74880C9944775448304B263D191c6077F",
                chiGasToken: "none",
                customRouter: "none",
                dexAddress: []
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
        ]
    },
    transaction: {
        gwei: "high", // gwei your transaction, format INPUT is NUMBER, TEXT(auto, high).
        amount: "0.0000001", // amount your transaction. format INPUT is NUMBER.
        gasLimit: "300000", // gaslimit your transaction. format INPUT is NUMBER.
        waitTxStatus: "disable", // wait transaction status success or failed, format INPUT is TEXT(enable, disable).

        botsniper: {
            /**
             * how the botsniper works:
             * 1. bot will simulate the transaction until it is successful if it doesn't work the bot will do it again continuously
             * 2. if the transaction simulation is successful, the bot will send your transaction
             *
             * about gwei for botsniper :
             * 1. if you set gwei to "auto" then bot will send your tx with number of gwei standard blockchain but not top 1 in block
             * 2. if you set gwei to "high" then the bot will send your tx will be at position 1 in the block
             * 3. if you set gwei to a number then the bot will process your tx according to that number
             *
             * the settings that need to be set in this file config.js to run the botsniper :
             * - urlNodeBlockchain
             * - encryptTextFromWallet
             * - allAddress
             * - transaction/gwei
             * - transaction/amount
             * - transaction/gasLimit
             * - transaction/waitTxStatus
             * - botsniper/optionSwap or botsniper/optionAutoTradeSellTokenOnly or botsniper/optionPresale
             */
            intervalCheck: "500", // input time mileseconds for simulateTransaction, format INPUT is NUMBER.
            optionSwap: {
                buy: {
                    targetBulk: "1", // target bulk for swap, this method using SCRIPT to send bulk transaction with different transaction, format INPUT is NUMBER.
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
                // [autoTradeSellToken] use the autoTradeSellToken feature directly without having to swap in this bot
                takeprofit: "2", // percentage increase in token price, format INPUT is NUMBER.
                cutlose: "20", // percentage decrease in token price, max 100, format INPUT is NUMBER.
            },
            optionPresale: {
                targetBulk: "1000", // target bulk for send tx, this method using SCRIPT to send bulk transaction with different transaction, format INPUT is NUMBER
            }
        },

        botexploit: {
            /**
             * I explain the features "use" below
             * default = meaning the bot will filter transactions using the PREMIUM mempool of this bot without disturbing "urlMainNode", and after finding a matching transaction the bot will send transactions using "urlMainNode". only support network BSC, ETH, MATIC, POLYGON
             * custom = means the bot will filter transactions using "urlMainNode", and after finding a matching transaction the bot will send transactions using "urlMainNode". support all network
             */
            use: "custom", // if your have private node GETH, set this is to custom and set if no have set this is to default, format INPUT is TEXT(default, custom).
            key: "05dfdc01-d98e-4f6b-b896-b24fdc2c601d", // function for use: "default", contact author to get key, format INPUT is TEXT.
            customRouter: {
                /**
                 * about customRouter:
                 * if you set "useChiGasToken" to "enable" you must be set "useCustomRouter" to "enable"
                 * if you set "useCustomRouter" to "enable" bot will process backrun,sandwich transaction using CUSTOM ROUTER
                 * if you set "useCustomRouter" to "enable" bot will process "targetBulk" in 1 transaction
                 */
                useChiGasToken: "disable", // if you set "gwei" to "high", set this feature to enable to reduce transaction fees and make sure you have the chi token, format INPUT is TEXT(enable, disable)
                useCustomRouter: "disable" // set to "enable" to use router with custom router, format INPUT is TEXT(enable, disable)
            },
            optionSwap: {
                backrun: {
                    /**
                     * note :
                     * - if you set the "filterMethodId" with the addLiquidity method or addLiquidityETH, bot will automatically filter the target token that will add liquidity from "addressPathSwap"
                     * - if you set the "filterAddress" value but the "filterMethod" is not set then the bot will swap if the address in filterAddress performs a method other than: transfer, transferFrom, approve, mint, burn
                     * - you must set "filterAddress" if using backrun
                     *
                     * how the backrun works:
                     * 1. bot will filter in the mempool pending transactions with the data already provided in "filterMethodId" and "filterAddress"
                     * 2. if bot has found it, the bot will make swap according to the specified gwei and will make swap more than 1x if "targetBulk" is set to more than 1
                     *
                     * about gwei for backrun :
                     * 1. if you set gwei to "auto" then bot will send your tx with same number of gwei target tx but not top 1 in block
                     * 2. if you set gwei to "high" then the bot will send your tx above the target tx and your tx will be at position 1 in the block but your tx position is different by 1 blockNumber with the tx target
                     * 3. if you set gwei to number then the bot will process your tx according to that number
                     *
                     * the settings that need to be set in this file config.js to run the backrun :
                     * - urlNodeBlockchain
                     * - encryptTextFromWallet
                     * - allAddress
                     * - transaction/gwei
                     * - transaction/amount
                     * - transaction/gasLimit
                     * - transaction/waitTxStatus
                     * - transaction/botexploit/use
                     * - transaction/botexploit/key
                     * - transaction/botexploit/customRouter
                     * - transaction/botexploit/backrun
                     */
                    targetBulk: "1", // if you set "useCustomRouter" to "enable" then the bot will send bulk transaction with CUSTOM ROUTER and will do it in 1 transaction, vice versa bot will send bulk transaction with SCRIPT and will do it in different transactions, format INPUT is NUMBER
                    filterMethodId: ["0xd0e30db0"], // method id must start at 0x and have a length of 10, format INPUT is TEXT
                    filterAddress: ["0xae13d989dac2f0debff460ac112a837c89baa7cd"], // filter transaction address on object "to", format INPUT is address
                },
                sandwich: {
                    /**
                     * how the sandwich feature works:
                     * 1. The bot will search for transactions according to the token address that has been set
                     * 2. The bot will buy if the BUY method is detected and if the target amount is greater than "filterMinimumAmountTarget" then the bot will buy tokens using the gwei setting "multipleGweiTxBeforeTargetTx"
                     * 3. after buying the bot will sell all the tokens earned from purchasing with the gwei standard blockchain at the same time
                     * 4. after that the bot will check whether the "delayAfterTx" setting has been filled with a numerical value then the bot will wait until it reaches the "delayAfterTx" value in seconds time format
                     * 5. after completion number 4, the bot will look for the transaction number 1 again
                     *
                     * about gwei for sandwich :
                     * 1. if you set gwei to "auto" then bot will send your tx above target tx but not top 1 in block
                     * 2. if you set gwei to "high" then bot will send your tx above target tx and your tx will be in position 1 is block
                     * 3. if you set gwei to number then the bot will process your tx according to that number
                     *
                     * the settings that need to be set in this file config.js to run the sandwich :
                     * - urlNodeBlockchain
                     * - encryptTextFromWallet
                     * - allAddress
                     * - transaction/gwei
                     * - transaction/amount
                     * - transaction/gasLimit
                     * - transaction/waitTxStatus
                     * - transaction/botexploit/use
                     * - transaction/botexploit/key
                     * - transaction/botexploit/customRouter
                     * - transaction/botexploit/sandwich
                     */
                    slipPage: "1", // slippage transaction to prevent being sandwiched by other bots, input 0 for unlimited slippage, format INPUT is NUMBER.
                    delayAfterTx: "500", // delay seconds after your tx sandwich, format INPUT is NUMBER, TEXT(disable).
                    filterMinimumAmountTarget: {
                        coin: "0.001", // minimum amount swap target in the number of coin target example BNB, ETH, CRO, format INPUT is NUMBER.
                        token: "0.001", // minimum amount swap target in the number of token target [TOKEN-1], format INPUT is NUMBER.
                    },
                },
                buyBulk: {
                    /**
                     * note: this menu use SCRIPT to send bulk transactions with different transactions. and use ROUTER not CUSTOM ROUTER.
                     * how the buyBulk works:
                     * 1. the bot will buy tokens according to the amount of the "targetBulk" value without waiting for the transaction status
                     * 2. the bot will delay before the transaction continues with the seconds time format according to the "delayPerTx" value if the "delayPerTx" value is not disable
                     * 3. if the value "stopIfSuccessEntered" is set to enable then the bot will check the balance of the wallet token that you want to buy whether it has entered your wallet or not if it is already entered the bot will stop making purchases
                     *
                     * about gwei for buybulk :
                     * 1. if you set gwei to "auto" then bot will send your tx with standard amount from blockchain but not top 1 in block
                     * 2. if you set gwei to "high" then the bot will send you an error because in this buyBulk the gwei "high" does not support
                     * 3. if you set gwei to the number then the bot will process your tx according to that number
                     *
                     * the settings that need to be set in this file config.js to run the buyBulk :
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
                    delayPerTx: "disable", // milesecond delay for each transaction, format INPUT is NUMBER, TEXT(disable).
                    targetBulk: "100", // target bulk your tx, format INPUT is NUMBER.
                },
            }
        }
    }
};
