/**
 * edit the configuration below using the help of syntax highlighting to make it easier
 * contact the author to ask questions regarding the configuration below
 * 
 * ================================== TIPS =======================================
 * for network cronos use gwei minimum 5000
 */

module.exports = {
    allUrl: {
        urlMainNode: "wss://bsc-ws-node.nariox.org:443", // node blockchain rpc support ipc/http/wss for swap transaction, format INPUT is TEXT.
        urlSecondNode: "https://bsc-dataseed1.ninicoin.io/", // node blockchain rpc support ipc/http/wss for checker, wait transaction status, format INPUT is TEXT.
    },
    myWallet: {
        privateKeyOrMnemonic: "WALLET ENCRYPTION KEY AES" // your wallet mnemonic pharse or privateKey, format INPUT is TEXT.
    },
    allAddress: {
        router: "0x10ED43C718714eb63d5aA57B78B54704E256024E", // address router with structur code UniswapV2, format INPUT is address.
        addressTokenUsedToBuy: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // [TOKEN-0] address that will be used to buy token, format INPUT is address.
        addressTokenOrPresale: "0xe9e7cea3dedca5984780bafc599bd69add087d56", // [TOKEN-1] address token or presale to buy, format INPUT is address.
        storingAddressAboutBot: [
            {
                chainid: "1", // network ETH
                honeypotIs: "0x5bf62ec82af715ca7aa365634fab0e8fd7bf92c7",
                wrappedCoin: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                chiGasToken: "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c",
                customRouter: "none"
            },
            {
                chainid: "25", // network CRO
                honeypotIs: "none",
                wrappedCoin: "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23",
                chiGasToken: "none",
                customRouter: "none"
            },
            {
                chainid: "56", // network BNB
                honeypotIs: "0x2bf75fd2fab5fc635a4c6073864c708dfc8396fc",
                wrappedCoin: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
                chiGasToken: "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c",
                customRouter: "0x00c3bD2BaA40096E79617135A8ee0E18a8BDCEF7"
            },
        ]
    },
    transaction: {
        gwei: "auto", // gwei transaction, format INPUT is NUMBER, TEXT(auto).
        amount: "0.00001", // amount token to buy token. format INPUT is NUMBER.
        gasLimit: "1000000", // gas limit transaction. format INPUT is NUMBER.
        waitTxStatus: "disable", // wait transaction status success or failed, format INPUT is TEXT(enable, disable).
        botsniper: {
            intervalCheck: "500", // input time mileseconds for interval check, format INPUT is NUMBER.
            optionSwap: {
                buy: {
                    antiscamtokencantsell: "disable", // only support pair WBNB or BNB, example TOTEN/WBNB, TOTEN/BNB, if liquidity not WBNB or BNB set this to disable. format INPUT is TEXT(enable, disable)
                    waitingForLiquidity: "enable", // if this is set to disable, bot wil buy token without liquidity, format INPUT is TEXT(enable, disable).
                    targetBulk: "1", // target bulk for swap, this method using SCRIPT to send bulk transaction with different transaction, format INPUT is NUMBER.
                    timeout: "disable", // delay seconds before buy token for bypass antibot on token, format INPUT is NUMBER, TEXT(disable).
                },
                sell: {
                    // [autoTradeSellToken]. if you use "takeprofit" or "cutlose" you must be set "useSellToken" to enable
                    useSellToken: "enable", // set enable and bot will sell token after buy token, format INPUT is TEXT(enable, disable).
                    takeprofit: "1", // percentage increase in token price, format INPUT is NUMBER, TEXT(disable).
                    cutlose: "99", // percentage decrease in token price, max 100, format INPUT is NUMBER, TEXT(disable).
                }
            },
            optionPresale: {
                // if you set targetBulk upper 1 you must be set "waitingForUnlock" to disable
                waitingForUnlock: "enable", // if this is set to disable, bot will send coin without status unlock, format INPUT is TEXT(enable, disable)
                targetBulk: "1", // target bulk for send tx, this method using SCRIPT to send bulk transaction with different transaction, format INPUT is NUMBER
            }
        },
        botexploit: {
            /**
             * I explain the features "use" below
             * default = meaning the bot will filter transactions using the PREMIUM mempool of this bot without disturbing "urlMainNode", and after finding a matching transaction the bot will send transactions using "urlMainNode". only support network BSC, ETH, MATIC, POLYGON
             * custom = means the bot will filter transactions using "urlMainNode", and after finding a matching transaction the bot will send transactions using "urlMainNode". support all network
             */
            use: "default", // if your have private node GETH, set this is to custom and set if no have set this is to default, format INPUT is TEXT(default, custom).
            key: "key from author", // function for default, contact author to get key, format INPUT is TEXT.
            customRouter: {
                /**
                 * about customRouter:
                 * custom router works like a regular pancakeswap router but it is custom made and added some interesting features in it, and custom router will process transactions on internal. contact the author to request a custom router if you have purchased this botexploit
                 * if you set "useChiGasToken" to enable you must be enable "useCustomRouter"
                 * if you set "useCustomRouter" to enable bot will process all botexploit features transaction using CUSTOM ROUTER 
                 * if you set "useCustomRouter" to enable bot will process "targetBulk" in 1 transaction
                 */
                useChiGasToken: "disable", // if you set "gwei" superhigh, set this feature to enable to reduce transaction fees and make sure you have the chi token, format INPUT is TEXT(enable, disable)
                useCustomRouter: "enable" // set to enable to use router with custom router, format INPUT is TEXT(enable, disable)
            },
            optionSwap: {
                firstLaunchBuy: {
                    /**
                     * how the firstlaunchbuy feature works:
                     * 1. The bot will look for the addLiquidity transaction or token method in the mempool according to the value set "filterMethodTokenFromAddress" if the value "usefilterMethodTokenFromAddress" is set to enable
                     * 2. if you have found the bot will make purchases on the same blockNumber with more than 1 purchase if "targetBulk" is set more than 1
                     * 3. after buying, the bot will sell token with takeprofit or cutlose settings if the value "useSellToken" is set to enable
                     * 
                     * the settings that need to be set in this file config.js to run the firstlaunchbuy feature:
                     * - allUrl
                     * - myWallet
                     * - allAddress
                     * - transaction/gwei
                     * - transaction/amount
                     * - transaction/gasLimit
                     * - transaction/waitTxStatus
                     * - botexploit/use
                     * - botexploit/key
                     * - botexploit/customRouter
                     * - botexploit/firstLaunchBuy
                     */
                    targetBulk: "1", // if you set "useeCustomRouter" to enable then the bot will send bulk transaction with CUSTOM ROUTER and will do it in 1 transaction, vice versa bot will send bulk transaction with SCRIPT and will do it in different transactions, format INPUT is NUMBER
                    tokenFilterSettings: {
                        filterMethodTokenFromAddress: {
                            /**
                             * if you set "method" or "address" below then the bot will automatically filter the "addressTokenOrPresale" even if you don't enter the "addressTokenOrPresale" in the address below
                             * if you set the "method", you have to set the "address" for the bot to work and bot will filter your "method" and "addLiqudity"
                             */
                            method: [], // to detect whether address performs the "enable swap" method via the "addressTokenOrPresale". if you don't know set to empty array [ ] and if it is empty the bot will filter methods other than ERC20 and will swap, format INPUT is ARRAY(TEXT), TEXT(empty).
                            address: [] // to detect if the address performs "enable swap / addLiquidity / addLiquidityETH" to token address via the token holder address and if methods empty the bot will filter methods other than ERC20 and will swap, format INPUT is ARRAY(TEXT), TEXT(empty).
                        },
                        usefilterMethodTokenFromAddress: "disable", // if you want to use "filterMethodTokenFromAddress" set this to enable, format INPUT is TEXT(enable, disable)
                    },
                    sell: {
                        // [autoTradeSellToken]. if you use "takeprofit" or "cutlose" you must be set "useSellToken" to enable
                        useSellToken: "disable", // set enable and bot will sell token after buy token, format INPUT is TEXT(enable, disable).
                        takeprofit: "200", // percentage increase in token price, format INPUT is NUMBER, TEXT(disable).
                        cutlose: "50", // percentage decrease in token price, format INPUT is NUMBER, TEXT(disable).
                    }
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
                     * the settings that need to be set in this file config.js to run the sandwich feature:
                     * - allUrl
                     * - myWallet
                     * - allAddress
                     * - transaction/amount
                     * - transaction/gasLimit
                     * - transaction/waitTxStatus
                     * - botexploit/use
                     * - botexploit/key
                     * - botexploit/customRouter
                     * - botexploit/sandwich
                     */
                    slipPage: "20", // slippage transaction to prevent being sandwiched by other bots, input 0 for unlimited slippage, format INPUT is NUMBER.
                    delayAfterTx: "200", // delay seconds after your tx sandwich, format INPUT is NUMBER, TEXT(disable).
                    multipleGweiTxBeforeTargetTx: "1.1", // the value must be more than 1. example of how it works, the target of buying BUSD tokens with 5 gwei bots will do multiple gwei targets with this set and the results of the gwei calculations will be used for the first BUY, format INPUT is NUMBER.
                    filterMinimumAmountTarget: {
                        coin: "1", // minimum amount swap target in the number of coin target example BNB, ETH, CRO, format INPUT is NUMBER.
                        token: "5", // minimum amount swap target in the number of token target [TOKEN-1], format INPUT is NUMBER.
                    },
                },
                buyBulk: {
                    /**
                     * how the buyBulk feature works:
                     * 1. the bot will buy tokens according to the amount of the "targetBulk" value without waiting for the transaction status
                     * 2. the bot will delay before the transaction continues with the seconds time format according to the "delayPerTx" value if the "delayPerTx" value is not disable
                     * 3. if the value "stopIfSuccessEntered" is set to enable then the bot will check the balance of the wallet token that you want to buy whether it has entered your wallet or not if it is already entered the bot will stop making purchases
                     * 
                     * note: this method use SCRIPT to send bulk transactions with different transactions. and use ROUTER not CUSTOM ROUTER.
                     * 
                     * the settings that need to be set in this file config.js to run the buyBulk feature:
                     * - allUrl
                     * - myWallet
                     * - allAddress
                     * - transaction/gwei
                     * - transaction/amount
                     * - transaction/gasLimit
                     * - transaction/waitTxStatus
                     * - botexploit/buyBulk
                     */
                    stopIfSuccessEntered: "enable", // if this set to enable bot will automatically stop if the token has been successfully entered into the wallet. format INPUT is TEXT(enable, disable).
                    delayPerTx: "disable", // milesecond delay for each transaction, format INPUT is NUMBER, TEXT(disable).
                    targetBulk: "5", // target bulk for swap, format INPUT is NUMBER.
                }
            }
        }
    }
};
