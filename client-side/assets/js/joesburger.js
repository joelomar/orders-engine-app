var socket = io.connect('http://localhost:3000');

var date = new Date().toLocaleString();
var randNum = Math.floor((Math.random() * 9000) + 1);



function orderOne() {

   $('#button').hide();
   $('#options_box').show();
   $('input[id=deli]').attr('checked',false);
   $('input[id=pick]').attr('checked',false);
   $('input[id=ath]').attr('checked',false);
   $('input[id=credit]').attr('checked',false);
   $('input[id=debit]').attr('checked',false);
   $('input[id=cash]').attr('checked',false);

   
}



var payMethod,
    deli,
    deliVal,
    pickVal,
    athVal,
    creditVal,
    debitVal,
    cashVal,
    spec,
    name,
    phone;


function placeOrder() {

    deliVal = document.getElementById("deli").checked,
    pickVal = document.getElementById("pick").checked,
    athVal = document.getElementById("ath").checked,
    creditVal = document.getElementById("credit").checked,
    debitVal = document.getElementById("debit").checked,
    cashVal = document.getElementById("cash").checked,
    spec = document.getElementById("description").value,
    name = document.getElementById("order_name").value,
    phone = document.getElementById("phone").value;





 $('#options_box').hide();


  if (deliVal === true) {

         deli = 'Delivery';

  }

  if (pickVal === true) {

        deli = 'Pick-Up';

  }

  if (athVal === true) {

     $('#ath_box').show();
     payMethod = 'ATH Movil';

  }

  if (creditVal === true) {

     $('#credit_box').show();
      payMethod = 'Tarj. Credito';
  }

  if (debitVal === true) {

     $('#debit_box').show();
      payMethod = 'Tarj. Debito';

  }

  if (cashVal === 'cash') {

      payMethod = 'Cash';

  }


}






function sendDataToServer() {

    
    socket.emit('orders', { orderNum: randNum,
                            restName: 'Joes Burger',
                            orderDesc: 'Combo #1, Doble chees burger with fries',
                            userSpec: spec,
                            addOns: 'Papas supreme',
                            deliPick: deli,
                            clientName: name,
                            orderTime: date,
                            orderPrice: 6.99,
                            orderPayment: payMethod,
                            clientPhone: phone
                     });

    
  }


//---------------------ORDER TWO---------------------//





function orderTwo() {

    //var addOn;
    //var name;
   // var user;
   // var pay;
   // var mail;
   // var clientPhone;
    
    socket.emit('orders', { orderNum: randNum,
                            restName: 'Joes Burger',
                            orderDesc: 'Combo #2, Doble Bacon Burger with fries',
                            addOns: 'Ice Cream',
                            deliPick: 'Pick-Up',
                            clientName: 'Ana',
                            userName: 'anagg@gmail.com',
                            orderTime: date,
                            orderPrice: 8.99,
                            orderPayment: 'Cash',
                            clientEmail: 'anagg235@gmail.com',
                            clientPhone: '787-342-4994'
                     });

    alert('Send Order Two');
}

function orderThree() {

    //var addOn;
    //var name;
   // var user;
   // var pay;
   // var mail;
   // var clientPhone;
    
    socket.emit('orders', { orderNum: randNum,
                            restName: 'Joes Burger',
                            orderDesc: 'Combo #3, Ribs Burger with fries',
                            addOns: 'Beers',
                            deliPick: 'Delivery',
                            clientName: 'Gaby',
                            userName: 'gaby03',
                            orderTime: date,
                            orderPrice: 12.99,
                            orderPayment: 'Credito',
                            clientEmail: 'gaby@gmail.com',
                            clientPhone: '787-456-6734'
                     });

    alert('Send Order three');
}


function orderFour() {

    //var addOn;
    //var name;
   // var user;
   // var pay;
   // var mail;
   // var clientPhone;
    
    socket.emit('orders', { orderNum: randNum,
                            restName: 'Joes Burger',
                            orderDesc: 'Combo #4, Big Sampler with fries',
                            addOns: 'Beers 6-packs',
                            deliPick: 'Delivery',
                            clientName: 'Lupe',
                            userName: 'lalupe56',
                            orderTime: date,
                            orderPrice: 15.99,
                            orderPayment: 'Cash',
                            clientEmail: 'lalupe@gmail.com',
                            clientPhone: '787-346-4567'
                     });

    alert('Send Order Four');
}


