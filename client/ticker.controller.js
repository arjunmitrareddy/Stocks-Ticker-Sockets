/**
 * Created by arjunMitraReddy on 6/23/2016.
 */
(function() {
    'use strict';
    angular.module('ticker')
        .controller('tickerController', tickerController);

    tickerController.$inject = ['$timeout', '$interval', '$scope', '$location'];

    function tickerController($timeout, $interval, $scope, $location) {

        var tckrCtrl = this;


        tckrCtrl.stocks = [
            {
                title: 'ABBV',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
                last_trade_time: null,
                dividend: null,
                yield: null*/
            },
            {
                title: 'SBH',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
                last_trade_time: null,
                dividend: null,
                yield: null*/
            },
            {
                title: 'ZFC',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
                last_trade_time: null,
                dividend: null,
                yield: null*/
            },
            {
                title: 'MBT',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
                last_trade_time: null,
                dividend: null,
                yield: null*/
            },
            {
                title: 'GOOG',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
                last_trade_time: null,
                dividend: null,
                yield: null*/
            },
            {
                title: 'GK',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
                last_trade_time: null,
                dividend: null,
                yield: null*/
            },
            {
                title: 'GCV',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
                last_trade_time: null,
                dividend: null,
                yield: null*/
            },
            {
                title: 'RRD',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
                last_trade_time: null,
                dividend: null,
                yield: null*/
            },
            {
                title: 'RAX',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
                last_trade_time: null,
                dividend: null,
                yield: null*/
            },
            {
                title: 'RADA',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
                last_trade_time: null,
                dividend: null,
                yield: null*/
            },
            {
                title: 'SAIC',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
             last_trade_time: null,
             dividend: null,
             yield: null*/
            },
            {
                title: 'SCG',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
             last_trade_time: null,
             dividend: null,
             yield: null*/
            },
            {
                title: 'BAC',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
             last_trade_time: null,
             dividend: null,
             yield: null*/
            },
            {
                title: 'EAA',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
             last_trade_time: null,
             dividend: null,
             yield: null*/
            },
            {
                title: 'EAT',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
             last_trade_time: null,
             dividend: null,
             yield: null*/
            },
            {
                title: 'HAE',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
             last_trade_time: null,
             dividend: null,
             yield: null*/
            },
            {
                title: 'HCN',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
             last_trade_time: null,
             dividend: null,
             yield: null*/
            },
            {
                title: 'LCI',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
             last_trade_time: null,
             dividend: null,
             yield: null*/
            },
            {
                title: 'LHO',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
             last_trade_time: null,
             dividend: null,
             yield: null*/
            },
            {
                title: 'ZAYO',
                exchange: null,
                price: null,
                change: null,
                change_percent: null/*,
             last_trade_time: null,
             dividend: null,
             yield: null*/
            }
        ];

        var socket = io.connect($location.absUrl());
        for (var s in tckrCtrl.stocks) {
            if (tckrCtrl.stocks.hasOwnProperty(s)) {
                socket.emit('ticker', tckrCtrl.stocks[s].title);
            }
        }

        socket.on('quote', function(data) {
            for (var s in tckrCtrl.stocks) {
                if (tckrCtrl.stocks.hasOwnProperty(s)) {

                    if (tckrCtrl.stocks[s].title == data.ticker) {
                        tckrCtrl.stocks[s].exchange = data.exchange;
                        tckrCtrl.stocks[s].price = data.price;
                        tckrCtrl.stocks[s].change = data.change;
                        tckrCtrl.stocks[s].change_percent = data.change_percent;
                        $scope.$apply();
                        /*stocks[s].last_trade_time = data.last_trade_time;
                        stocks[s].dividend = data.dividend;
                        stocks[s].yield = data.yield;*/
                    }
                }
            }
        });

        tckrCtrl.moving = false;

        tckrCtrl.moveLeft = function() {
            tckrCtrl.moving = true;
            $timeout(tckrCtrl.switchFirst, 1000);
        };
        tckrCtrl.switchFirst = function() {
            tckrCtrl.stocks.push(tckrCtrl.stocks.shift());
            tckrCtrl.moving = false;
            $scope.$apply();
        };


        $interval(tckrCtrl.moveLeft, 2000);


    }

})();