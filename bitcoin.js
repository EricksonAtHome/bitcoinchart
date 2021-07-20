const app = new Vue({
    el: '.btc-badge',
    data: {
        btcUSD: '0.00',
        percentChange: '0',
        upDown: 'up',
    },
    mounted() {
        this.getInfo();

        setInterval(()=> {
            this.getInfo();
        }, 1000*60);
    },
    methods: {
        getPercentChange(newPrice, open) {
            this.percentChange = parseFloat(((newPrice - open) / open) * 100).toFixed(4)
            if (newPrice > open) {
                this.upDown = 'up'
            } else {
                this.upDown = 'down'
            }
        },
        getInfo() {
          axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD&e=Coinbase')
            .then(response => {
              const open = response.data.RAW.BTC.USD.OPEN24HOUR
              const newPrice = response.data.RAW.BTC.USD.PRICE
              console.log(open);
              this.getPercentChange(newPrice, open);
              this.btcUSD = newPrice
          });
        }
    },
});

//MIT License

//Copyright (c) 2021 Mr Erickson - OnlineThuis Blockchain Network

//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.