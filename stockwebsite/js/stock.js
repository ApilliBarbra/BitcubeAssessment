/*
 * function to clear the local storage
 */
/*
window.onbeforeunload = function() {
    localStorage.clear();
};
*/
 

window.onload = function() {

    var price;

    if ('errs' in localStorage) {

        var err = null;
        var errsFromLocalStorage = localStorage.getItem('errs');

        if (errsFromLocalStorage && 'errs' in localStorage){
            err = JSON.parse(errsFromLocalStorage);
        }

        //the array exists
        if (err != null) {

            if (err[0] == 'error_add') {
                document.getElementById("error_add").innerHTML = err[1];
            } else if (err[0] == 'error_remove') {
                document.getElementById("error_remove").innerHTML = err[1];
            }
    
            //set errs array
            localStorage.setItem('errs', null);
        } else {
            document.getElementById("error_add").innerHTML = "";
            document.getElementById("error_remove").innerHTML = "";
        }
    }


    document.getElementById("add").reset();
    document.getElementById("remove").reset();

    if (!('prdt1number' in localStorage)){

        localStorage.prdt1number = 0;
        localStorage.prdt1price = 0;

        document.getElementById("prdt01number").innerHTML = 0;
        document.getElementById('prdt01price').innerHTML = 0;
    } else {

        price = localStorage.prdt1price;
        document.getElementById("prdt01number").innerHTML = localStorage.prdt1number;
        document.getElementById('prdt01price').innerHTML =  Math.round(price*100)/100;
    }


    if (!('prdt2number' in localStorage)){

        localStorage.prdt2number = 0;
        localStorage.prdt2price = 0;

        document.getElementById("prdt02number").innerHTML = 0;
        document.getElementById('prdt02price').innerHTML = 0;
    } else {

        price = localStorage.prdt2price;
        document.getElementById("prdt02number").innerHTML = localStorage.prdt2number;
        document.getElementById('prdt02price').innerHTML =  Math.round(price*100)/100;
    }


    if (!('prdt3number' in localStorage)){
        
        localStorage.prdt3number = 0;
        localStorage.prdt3price = 0;

        document.getElementById("prdt03number").innerHTML = 0;
        document.getElementById('prdt03price').innerHTML = 0;
    } else {

        price = localStorage.prdt3price;
        document.getElementById("prdt03number").innerHTML = localStorage.prdt3number;
        document.getElementById('prdt03price').innerHTML =  Math.round(price*100)/100;
    }

};


function addStock() {

    var prdt = document.getElementById("addproducts").value;
    var number = document.getElementById("itemsRecvd").value;
    var price = document.getElementById("price").value;

    if (!number || !price || !prdt) {

        var err = ['error_add', "Number, product or price is invalid"];
        //set errs array
        localStorage.setItem('errs', JSON.stringify(err));
        return;

    } else {
        
        var prdtnum;
        var avgprice;

        if (prdt === "product01") {

            if (localStorage && 'prdt1number' in localStorage) {
                prdtnum = parseInt(number) + parseInt(localStorage.prdt1number);   
            }
        
            if (localStorage && 'prdt1price' in localStorage) {
                avgprice = ( (parseFloat(price)*parseInt(number)) + (parseFloat(localStorage.prdt1price)*parseInt(localStorage.prdt1number)) );
                avgprice = avgprice / prdtnum;
            }

            localStorage.prdt1number = prdtnum;
            localStorage.prdt1price = avgprice;

        } else if (prdt === "product02"){

            if (localStorage && 'prdt2number' in localStorage) {
                prdtnum = parseInt(number) + parseInt(localStorage.prdt2number);
            }
        

            if (localStorage && 'prdt2price' in localStorage) {
                avgprice = ( (parseFloat(price)*parseInt(number)) + (parseFloat(localStorage.prdt2price)*parseInt(localStorage.prdt2number)) );
                avgprice = avgprice / prdtnum;
            }

            localStorage.prdt2number = prdtnum;
            localStorage.prdt2price = avgprice;

        } else if (prdt === "product03") {

            if (localStorage && 'prdt3number' in localStorage) {
                prdtnum = parseInt(number) + parseInt(localStorage.prdt3number);
            }
        
            if (localStorage && 'prdt3price' in localStorage) {
                avgprice = ( (parseFloat(price)*parseInt(number)) + (parseFloat(localStorage.prdt3price)*parseInt(localStorage.prdt3number)) );
                avgprice = avgprice / prdtnum;
            }

            localStorage.prdt3number = prdtnum;
            localStorage.prdt3price = avgprice;
        
        }

    }

}

 
function removeStock() {
    var prdt = document.getElementById("removeproducts").value;
    var number = document.getElementById("itemsBght").value;
    var email = document.getElementById("email").value;

    if (!number || !email || !prdt) {

        var err = ['error_remove', "Number, product or email is invalid"];
        //set errs array
        localStorage.setItem('errs', JSON.stringify(err));
        return;

    } else {
        
        var prdtnum;

        if (prdt === "product01") {

            if (parseInt(localStorage.prdt1number) == 0) {

                var err = ['error_remove', "Product 01 is done"];
                //set errs array
                localStorage.setItem('errs', JSON.stringify(err));
                return;

            }

            if (localStorage && 'prdt1number' in localStorage) {
                prdtnum = parseInt(localStorage.prdt1number) - parseInt(number);
            }

            if (prdtnum < 0) {
                var err = ['error_remove', "Insufficient number of product 01"];
                localStorage.setItem('errs', JSON.stringify(err));
                return;
            }

        } else if (prdt === "product02"){

            if (parseInt(localStorage.prdt2number) == 0) {
                var err = ['error_remove', "Product 02 is done"];
                localStorage.setItem('errs', JSON.stringify(err));
                return;
            }
    
            if (localStorage && 'prdt2number' in localStorage) {
                prdtnum = parseInt(localStorage.prdt2number) - parseInt(number);
            }
        
            if (prdtnum < 0) {
                var err = ['error_remove', "Insufficient number of product 02"];
                localStorage.setItem('errs', JSON.stringify(err));
                return;
            }

        } else if (prdt === "product03") {
            
            if (parseInt(localStorage.prdt3number) == 0) {
                var err = ['error_remove', "Product 03 is done"];
                localStorage.setItem('errs', JSON.stringify(err));
                return;
            }
        
            if (localStorage && 'prdt3number' in localStorage) {
                prdtnum = parseInt(localStorage.prdt3number) - parseInt(number);
            }
    
            if (prdtnum < 0) {
                var err = ['error_remove', "Insufficient number of product 03"];
                localStorage.setItem('errs', JSON.stringify(err));
                return;
            }

        }

    }


    //check if email is there
    if (!('emails' in localStorage)){

        var emls = [];
        emls.push(email);
        localStorage.setItem('emails', JSON.stringify(emls));

    } else {
    
        var emls = null;
        var emailsFromLocalStorage = localStorage.getItem('emails');

        if (emailsFromLocalStorage && 'emails' in localStorage){
            emls = JSON.parse(emailsFromLocalStorage);
        }
    
        //the array exists
        if (emls == null) {

            emls = [];
            emls.push(email);

            //empty emails array
            localStorage.setItem('emails', JSON.stringify(emls));

        } else {


            if (emls.includes(email)) {
                var err = ['error_remove', "Email already used to purchase products"];
                //set errs array
                localStorage.setItem('errs', JSON.stringify(err));
                return;

            } else {
                //add it to emails
                emls.push(email);
                //empty emails array
                localStorage.setItem('emails', JSON.stringify(emls));
            }    
    
        }

    }


    if (prdt === "product01") {
        localStorage.prdt1number = prdtnum;
    } else if (prdt === "product02"){
        localStorage.prdt2number = prdtnum;
    } else if (prdt === "product03") {
        localStorage.prdt3number = prdtnum;
    }

}
 