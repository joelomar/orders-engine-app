$(document).ready(function() {

var sockets = io.connect('http://localhost:3000', { 'forceNew': true });

var dbUser = 'joel09',
    dbPass = '1234',
    user,
    pass,
    order,
    time,
    desc,
    specs,
    adds,
    price,
    pay,
    client,
    trans,
    phone,
    dataHold,
    server;
  


    $('#main').hide();
    $('#login_box').show();


    $('#acces_button').click(function() {


         user = document.getElementById('username').value;
         pass = document.getElementById('password').value;

         if (user === dbUser && pass === dbPass) {

             $('#login_box').hide();
             $('#main').show();


      }
      else {

          alert('acces error');

      }


});




    
    sockets.on('clientLine', function (data) {

             order = data.clientOrder;
             time = data.clientTime; 
             desc = data.clientDesc;
             specs = data.clientSpec;
             adds = data.clientAdd;
             price = data.clientPrice;
             pay = data.clientPay;
             client = data.clientName;
             trans = data.transport;
             phone = data.clientPhone;

         $('#data_holder').prepend($('<p id="p">').text('ORDER: ' + data.clientOrder + ' ---- ' + 'TIME: ' + data.clientTime + ' ---- ' + 'DESC: ' + data.clientDesc + ' ---- ' + 'SPECS: ' + data.clientSpec + ' ---- ' + 'ADDONS: ' + data.clientAdd + ' ---- ' + 'PRICE: ' +  data.clientPrice + ' ---- ' + 'PAYMENT: ' + data.clientPay + ' ---- ' + 'CLIENT: ' + data.clientName + ' ---- ' + 'TRANSPORT: ' + data.transport + ' ---- ' + 'PHONE: ' +  data.clientPhone));
         $('#p').append('<br><input type="checkbox" name="served" value="served"> Servida <input type="checkbox" name="served" value="served"> LLamar <input type="checkbox" name="served" value="served"> Cupon');   

  
});


    sockets.on('dbLine', function (results) {
         alert('conect from angular data');
                 server = results.data;

                 alert(server);
});




//------------DB Results from server


$('#data_hold').append(.text(server)); 


//-----------Angular

var app = angular.module('orderApp', []);
             app.directive('testDirective', function() {
                 return {
                      template: 'angular results'


                 };
  
             });    






});//---------End jQuery











