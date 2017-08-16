const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('orders.sqlite');




//-------------Globals

var order,
    time,
    rest,
    desc,
    Spec,
    add,
    deli_pickup,
    price,
    transport,
    client,
    phone,
    sendData,
    htmlData;










//-------------Routes

app.use(express.static('client-side'));

app.get('/', function(req, res) {

    res.sendFile('client-side/index.html', {root:__dirname});

});




app.get('/joel09', function(req, res) {

    res.sendFile('client-side/joel09.html', {root:__dirname});

});










//-------------Database

/*db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS orders_db_test (number INTEGER, date STRING, restaurant STRING, info STRING, specs TEXT, addon STRING, price DECIMAL(19,2), payment STRING, client STRING, transport STRING, phone STRING)");
        console.log('table ready');
});*/
//db.close();

function saveOrder() {
    db.serialize(function() {
      
        var stmt = db.prepare("INSERT INTO orders_db_test VALUES(?,?,?,?,?,?,?,?,?,?,?)");
        stmt.run(order, time, rest, desc, Spec, add, price, payment, client, transport, phone);
        stmt.finalize();
        console.log('Data saved');

    });
//db.close();

};


db.serialize(function() {

    db.each("SELECT * FROM orders_db_test WHERE restaurant = 'Joes Burger' ORDER BY rowid DESC", function (err, row) {

        //sendData = row.number + ' ' + row.date + ' ' + row.restaurant + ' ' + row.info + ' ' + row.specs + ' ' + row.addon + ' ' + row.price +  ' ' + row.payment + ' ' + row.client + ' ' + row.transport + ' ' + row.phone;
        //sendData = row;
        sendData = row.number;
        console.log(sendData);

              //htmlData += "<tr><td>" + row.number + "</td><td>" + row.date + "</td><td>" + row.restaurant + "</td><td>" + row.info + "</td><td>" + row.addon + "</td><td>" + row.deli_pickup + "</td><td>" + row.price + "</td><td>" + row.client + "</td><td>" + row.user + "</td><td>" + row.payment + "</td><td>" + row.email + "</td><td>" + row.phone + "</td></tr>";
              
         });
        
    });
    //db.close();
  











//-------------Sockets Lines

io.on('connection', function (socket) {
    
    console.log('User connected in main Socket');

//------------Orders Line    
    
    socket.on('orders', function (data) {

         order = data.orderNum;
         time = data.orderTime;
         rest = data.restName;
         desc = data.orderDesc;
         Spec = data.userSpec;
         add = data.addOns;
         price = data.orderPrice;
         payment = data.orderPayment;
         transport = data.deliPick;
         client = data.clientName;
         phone = data.clientPhone;
         //console.log(order + ' ' + time + ' ' + rest + ' ' + desc + ' ' + add + ' ' + price + ' ' + client + ' ' + username + ' ' + payment + ' ' + email + ' ' + phone);
         saveOrder();
         dataResults();

         
         var clientData =  { clientOrder: order,
                          clientTime: time,
                          clientDesc: desc,
                          clientSpec: Spec,
                          clientAdd: add,
                          clientPrice: price,
                          clientPay: payment,
                          transport: transport,
                          clientName: client,
                          clientPhone: phone

                      }
                      
         io.emit('clientLine', clientData); 
         console.log('Client Data send via sockets');
         

    });


var dbClient = { data: sendData
                

}

  io.emit('dbLine', dbClient);
});










server.listen(3000 || process.env.PORT, function() {
    console.log('Server Listening in env PORT or 3000');
});





