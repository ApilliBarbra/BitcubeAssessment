/*
 * function to clear the local storage
 */
/*
window.onbeforeunload = function() {
    localStorage.clear();
};
*/
 

window.onload = function() {

    var price:number;

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


    (<HTMLFormElement>document.getElementById("add")).reset();
    (<HTMLFormElement>document.getElementById("remove")).reset();

    if (!('prdt1number' in localStorage)){

        localStorage.prdt1number = 0;
        localStorage.prdt1price = 0;

        document.getElementById("prdt01number").innerHTML = String(0);
        document.getElementById('prdt01price').innerHTML = String(0);
    } else {

        price = localStorage.prdt1price;
        document.getElementById("prdt01number").innerHTML = String(localStorage.prdt1number);
        document.getElementById('prdt01price').innerHTML =  String(Math.round(price*100)/100);
    }


    if (!('prdt2number' in localStorage)){

        localStorage.prdt2number = 0;
        localStorage.prdt2price = 0;

        document.getElementById("prdt02number").innerHTML = String(0);
        document.getElementById('prdt02price').innerHTML = String(0);
    } else {

        price = localStorage.prdt2price;
        document.getElementById("prdt02number").innerHTML = String(localStorage.prdt2number);
        document.getElementById('prdt02price').innerHTML =  String(Math.round(price*100)/100);
    }


    if (!('prdt3number' in localStorage)){
        
        localStorage.prdt3number = 0;
        localStorage.prdt3price = 0;

        document.getElementById("prdt03number").innerHTML = String(0);
        document.getElementById('prdt03price').innerHTML = String(0);
    } else {

        price = localStorage.prdt3price;
        document.getElementById("prdt03number").innerHTML = String(localStorage.prdt3number);
        document.getElementById('prdt03price').innerHTML =  String(Math.round(price*100)/100);
    }

};


 function addStock() : void {

    var prdt = (<HTMLInputElement>document.getElementById("addproducts")).value;
    var number = (<HTMLInputElement>document.getElementById("itemsRecvd")).value;
    var price = (<HTMLInputElement>document.getElementById("price")).value;

    if (!number || !price || !prdt) {

        var err = ['error_add', "Number, product or price is invalid"];
        //set errs array
        localStorage.setItem('errs', JSON.stringify(err));
        return;

    } else {
        
        var prdtnum:number;
        var avgprice:number;

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

 
function removeStock() : void {
    var prdt = (<HTMLInputElement>document.getElementById("removeproducts")).value;
    var number = (<HTMLInputElement>document.getElementById("itemsBght")).value;
    var email = (<HTMLInputElement>document.getElementById("email")).value;

    if (!number || !email || !prdt) {

        var err = ['error_remove', "Number, product or email is invalid"];
        //set errs array
        localStorage.setItem('errs', JSON.stringify(err));
        return;

    } else {
        
        var prdtnum : number;

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

        var emls:string[] = [];
        emls.push(email);
        localStorage.setItem('emails', JSON.stringify(emls));

    } else {
    
        var emls:string[] = null;
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


            if (email in emls) {
            //if (emls.includes(email)) {
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
 