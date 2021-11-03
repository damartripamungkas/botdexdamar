/**
 * edit the configuration below using the help of syntax highlighting to make it easier
 * contact the author to ask questions regarding the configuration below
 */
module.exports = {
    allUrl: {
        urlMainNode: "wss://bsc-ws-node.nariox.org:443", // custom node url support ipc/http/wss for swap transaction
        urlSecondNode: "https://bsc-dataseed1.ninicoin.io/" // node url support http/wss for checker
    },
    myWallet: {
        mnemonic: "pharse pharse pharse pharse pharse pharse pharse pharse pharse pharse pharse pharse ", // your wallet mnemonic pharse
    },
    allAddress: {
        WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // set this to address token for using buy token or WBNB, format INPUT is address.
        router: "0x10ED43C718714eb63d5aA57B78B54704E256024E", // address router with structur code UniswapV2, format INPUT is address.
        honeypotIs: "0x2bf75fd2fab5fc635a4c6073864c708dfc8396fc", // for function "antiScamTokenCantSell", format INPUT is address.
        chiGasToken: "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c", // chi gas token for reduce transaction fees, for botexploit, format INPUT is address.
        customRouter: "0x7E500Fd6C4f151E45C8396dCDC50E8f00f000285", // for now this custom contract only support network bsc, format INPUT is address.
        addressTokenOrPresale: "0xe9e7cea3dedca5984780bafc599bd69add087d56" // address token or presale, format INPUT is address.
    },
    transaction: {
        gwei: "5", // gwei or gasPrice transaction, format INPUT is NUMBER.
        amount: "0.00001", // amount token to buy token. format INPUT is NUMBER.
        gasLimit: "1000000", // gas limit transaction. format INPUT is NUMBER.
        waitTxStatus: "disable", // wait transaction status, format INPUT is enable, disable.
        botsniper: {
            intervalCheck: {
                swap: {
                    checkPause: "500", // input time mileseconds for interval check, format INPUT is NUMBER
                    checkScam: "500", // input time mileseconds for interval check, format INPUT is NUMBER
                },
                presale: "500", // input time mileseconds for interval check, format INPUT is NUMBER
            },
            optionSwap: {
                buy: {
                    antiscamtokencantsell: "disable", // only support pair WBNB, example TOTEN/WBNB, if liquidity not WBNB set this to disable. format INPUT is enable, disable 
                    waitingForLiquidity: "disable", // if this is set to disable, bot wil buy token without liquidity, format INPUT is enable, disable
                    targetBulk: "1", // target bulk for swap, this method using SCRIPT to send bulk, format INPUT is NUMBER
                    timeout: "disable", // memberi jeda waktu detik membeli token agar terhindar dari fitur antibot di token itu, format INPUT is NUMBER, disable 
                },
                sell: {
                    // if you use "takeprofit" and "cutlose" you must be set "useSellToken" to enable
                    useSellToken: "disable", // set enable and bot will sell token after buy token, format INPUT is enable, disable
                    takeprofit: "200", // persentase naik harga token, maxs unlimited. format INPUT adalah ANGKA atau disable
                    cutlose: "60", // persentase turun harga token, maxs 99. format INPUT adalah ANGKA atau disable
                }
            },
            optionPresale: {
                // if you set targetBulk upper 1 you must be set "waitingForUnlock" to disable
                waitingForUnlock: "enable", // if this is set to disable, bot wil send bnb without status unlock, format INPUT is enable, disable
                targetBulk: "1", // send bulk transactions with different NONCE using SCRIPT method, format INPUT is NUMBER
            }
        },
        botexploit: {
            /**
             * I explain the features "use" below
             * default = meaning the bot will filter transactions using the PREMIUM mempool of this bot without disturbing "urlMainNode", and after finding a matching transaction the bot will send transactions using "urlMainNode"
             * custom = means the bot will filter transactions using "urlMainNode", and after finding a matching transaction the bot will send transactions using "urlMainNode"
             */
            use: "default", // if your have private node GETH, set this is to custom and set if no have set this is to default, format INPUT is default, custom
            key: "---121-1121-232321-12-1-2-12---1", // function for default, contact author to get key, format INPUT is TEXT
            customRouter: {
                /**
                 * custom router works like a regular pancakeswap router but it is custom made and added some interesting features in it, and custom router will process transactions on internal. contact the author to request a custom router if you have purchased this botexploit
                 * if you set "useChiGasToken" to enable you must be enable "useCustomRouter"
                 * and if you set "useCustomRouter" to enable bot will process all botexploit transaction using CUSTOM ROUTER 
                 * if you set "useCustomRouter" to enable bot will process "targetBulk" with custom contract which will process transaction in 1 block
                 */
                useChiGasToken: "disable", // if you set "gwei" superhigh, set this feature to enable to reduce transaction fees and make sure you have the chi token, format INPUT is enable, disable
                useCustomRouter: "enable" // set to enable to use router with custom router, format INPUT is enable, disable
            },
            optionSwap: {
                firstLaunchBuy: {
                    targetBulk: "1", // send bulk transactions with SCRIPT or CUSTOM ROUTER, format INPUT is NUMBER
                    tokenFilterSettings: {
                        filterMethodTokenFromAddress: {
                            /**
                             * if you set "method" or "address" below then the bot will automatically filter the "addressToken" even if you don't enter the "addressToken" in the address below
                             * if you set the "method", you have to set the "address" for the bot to work
                             */
                            method: [], // to detect whether address performs the "enable swap" method via the address token. if you don't know set to empty array [ ] and if it is empty the bot will filter methods other than ERC20 and will swap, format INPUT is ARRAY(TEXT) or empty
                            address: [] // to detect if the address performs "enable swap / addLiquidity / addLiquidityETH" to token address via the token holder address and if methods empty the bot will filter methods other than ERC20 and will swap, format INPUT is ARRAY(TEXT) or empty
                        },
                        usefilterMethodTokenFromAddress: "disable", // if you want to use "filterMethodTokenFromAddress" set this to enable, format INPUT enable dan disable
                    },
                },
                sandwich: {
                    /**
                     * the bot will buy tokens with the entire amount in the wallet before using multipleGwei before the target transaction is completed, and vice versa
                     * if you set "waitBalanceResultSwapToken" to disable then the bot will swap back after tx without waiting to buy or sell
                     */
                    multipleGweiTxBeforeTargetTx: "1.1", // multiples of gwei, example target buy token BUSD with 5 gwei bot will multiple gwei with this set, format INPUT is NUMBER
                    waitBalanceResultSwapToken: "disable", // if you don't use a custom router set this to enable to get balance accuracy, but if enabled will leave a delay of about 2 blocks or set this to disable to do a quick swap back on the same block but token balance accuracy is uncertain, format INPUT is enable, disable
                    minimumAmountTxTarget: "disable", // filter minimun amount swap target, format INPUT is NUMBER, disable
                },
                buyBulk: {
                    /**
                     * this method using SCRIPT to send bulk transaction
                     * a suggestion if you use this feature please set the token balance amount with a nominal multiple of no more than x2 of your total token balance because if the bot succeeds in making a transaction then the bot will not make duplicate transactions
                     * 1 failed transaction = estimate tx fee is $0.05 ~ $0.2
                     */
                    targetBulk: "500" // target bulk for swap, format INPUT is NUMBER
                }
            }
        }
    }
};
