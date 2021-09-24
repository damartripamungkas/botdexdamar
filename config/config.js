module.exports = {
    urlHttp: "https://bsc-dataseed4.ninicoin.io/", // binance smart chain bsc http, using for checker or other
    urlWebsocket: "wss://bsc-ws-node.nariox.org:443", // binance smart chain bsc wss, using for checker or other
    useUrl: "wss", // use network for above, wss or http
    mainUrl: {
        urlHttp: "https://bsc-dataseed4.binance.org/", // binance smart chain bsc http
        urlWebsocket: "wss://CUSTOM.NODE:443", // binance smart chain bsc websocket
        use: "wss", // select network for main url, wss or http
    },
    myWallet: {
        mnemonic: "computer mouse laptop keyboard usb cable lamp fan screen", // your wallet mnemonic pharse
        address: "0x121213u193uc1u9182y498y232" // your wallet address
    },
    allAddress: {
        WBNB: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", // ubah address ini jika anda ingin membeli token selain menggunakan WBNB
        router: "0x10ED43C718714eb63d5aA57B78B54704E256024E", // address router
    },
    transaction: {
        intervalCheck: {
            swap: {
                checkPause: "500", // masukan dalam format mileseconds, maximal 999. format INPUT adalah angka
                checkScam: "500", // masukan dalam format mileseconds, maximal 999. format INPUT adalah angka
                getPriceToken: "500", // masukan dalam format mileseconds, maximal 999. format INPUT adalah angka
                autoTradeSellToken: "500", // masukan dalam format mileseconds, maximal 999. format INPUT adalah angka
            },
            presale: "500", // masukan dalam format mileseconds, maximal 999. format INPUT adalah angka
        },
        swap: {
            antiscamtokencantsell: "enable", // set ke disable jika liquidity token bukan WBNB. format INPUT adalah enable dan disable 
            buy: {
                amountBuy: "0.00001", // jumlah untuk membeli token. format input adalah ANGKA
                gweiBuy: "5", // gwei tx buy, normal nya adalah 5 jika ingin cepat pakai di atas 10. format INPUT adalah ANGKA contoh 5. [rekomend use 20++]
                gasLimitBuy: "auto", // gas limit tx buy. gunakan di atas 500K untuk buy token early. format INPUT adalah ANGKA atau auto. [rekomend use auto]
                optionBuy: {
                    timeout: "disable", // memberi jeda waktu detik membeli token agar terhindar dari fitur antibot di token itu. format INPUT adalah ANGKA atau disable
                    targetBulk: "1", // target jumlah swap bulk untuk melakukan swap secara cepat lebih dari 1x
                }
            },
            sell: {
                gweiSell: "5", // gwei tx sell, normal nya adalah 5 jika ingin cepat pakai di atas 9. format input dalam ANGKA contoh 5
                gasLimitSell: "auto", // gas limit tx sell. format INPUT adalah ANGKA atau auto. [rekomend use auto]
                optionSell: {
                    timeout: "disable", // jarak waktu detik dari setelah beli untuk ke jual. format INPUT adalah ANGKA atau disable
                    takeprofit: "9999", // persentase naik harga token, maxs unlimited. format INPUT adalah ANGKA atau disable
                    cutlose: "99", // persentase turun harga token, maxs 99. format INPUT adalah ANGKA atau disable
                },
            },
        },
        swapFaster: {
            /* feature limit but fast */
            amountSwap: "0.00001", // jumlah untuk membeli token. format input dalam ANGKA.
            gweiSwap: "5", // gwei swap faster. format INPUT adalah ANGKA. [rekomend use 20++]
            gasLimitSwap: "3000000", // gas limit swap faster. format INPUT adalah ANGKA. [recomend use 5000000]
            swapTokenWithSupportFee: "enable", // jika token yang anda beli memiliki tax fee maka aktifkan fitur ini dengan set ke "enable" jika tida support maka set ke "disable". format INPUT adalah enable, disable
            targetBulk: "3", // target jumlah swap bulk untuk melakukan swap secara cepat lebih dari 1x
        },
        swapBulkDirect: {
            /** bulk direct purchase without waiting for liquidity or other, include support fee transfer token */
            amountSwap: "0.00001", // jumlah untuk membeli token. format input dalam ANGKA.
            gweiSwap: "5", // gwei swap faster. format INPUT adalah ANGKA. [rekomend use 20++]
            gasLimitSwap: "3000000", // gas limit swap faster. format INPUT adalah ANGKA. [recomend use 5000000]
            targetBulk: "3", // target jumlah swap bulk untuk melakukan swap secara cepat lebih dari 1x
        },
        swapFrontrun: {
            /* will try to make swap token in the same block addLiquidity or other */
            amountSwap: "0.1", // jumlah untuk membeli token. format input dalam ANGKA.
            gweiSwap: "20", // gwei swap faster. format INPUT adalah ANGKA. [rekomend use 20++]
            gasLimitSwap: "3000000", // gas limit swap faster. format INPUT adalah ANGKA. [recomend use 5000000]
            swapTokenWithSupportFee: "enable", // jika token yang anda beli memiliki tax fee maka aktifkan fitur ini dengan set ke "enable" jika tida support maka set ke "disable". format INPUT adalah enable, disable
            targetBulk: "1", // target jumlah swap bulk untuk melakukan swap secara cepat lebih dari 1x
            optionSwap: {
                addCustomHash: "--", // foramt input none dan hash
                useCustomMethod: "enable", // format input enable dan disable
            }
        },
        token: {
            decimal: "18", // decimal token.
            symbol: "TOKEN_1", // symbol token.
        },
        presale: {
            amountPresale: `0.1`, // jumlah BNB(BSC) untuk membeli token presale format input adalah ANGKA
            gweiPresale: `100`, // gwei presale. format INPUT adalah ANGKA. [rekomend use 200++]
            gasLimitPresale: `21000`, // gas limit presale. format INPUT adalah ANGKA. [rekomend use 500000++]
        }
    },
};