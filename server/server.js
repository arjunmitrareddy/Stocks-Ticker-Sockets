/**
 * Created by arjunMitraReddy on 6/23/2016.
 */
var http = require('http'),
    express = require('express'),
    socketio = require('socket.io'),
    path = require('path'),
    request = require("request");
require('events').EventEmitter.prototype._maxListeners = 100;
var app = express(),
server = http.createServer(app).listen(8080, '0.0.0.0');
var sio = socketio.listen(server);

var dir = path.resolve(__dirname, '../client/');
app.use(express.static(path.resolve(__dirname, '../../StockTicker')));
app.use(express.static(path.resolve(__dirname, '../bower_components/')));
app.use(express.static(path.resolve(__dirname, '../client/')));
app.use('/', express.static(path.resolve(__dirname, '../client/index.html')));

var FETCH_INTERVAL = 5000;

sio.sockets.on('connection', function(socket) {
    socket.on('ticker', function(ticker) {
        track_ticker(socket, ticker);
    });
});

function track_ticker(socket, ticker) {


    get_quote(socket, ticker);

    //Every N seconds
    var timer = setInterval(function() {
        get_quote(socket, ticker);
    }, FETCH_INTERVAL);

    socket.on('disconnect', function () {
        clearInterval(timer);
    });
}


function get_quote(p_socket, p_ticker) {
    var url = 'https://www.google.com/finance/info?client=ig&q=' + p_ticker;
    request(url, function(error, response, body) {
        if (error) console.log(error);
        try {
        var res = JSON.parse(body.substring(5, body.length-2));
        }
        catch(e) {
            console.log(e);
        }
        var quote = {};
        quote.ticker = res.t;
        quote.exchange = res.e;
        quote.price = res.l_cur;
        quote.change = res.c;
        quote.change_percent = res.cp;
        p_socket.emit('quote', quote);
        /*quote.last_trade_time = data_object[0].lt;
         quote.dividend = data_object[0].div;
         quote.yield = data_object[0].yld;
        ;*/

    }
    );
}
console.log("Server Running on 8080");
