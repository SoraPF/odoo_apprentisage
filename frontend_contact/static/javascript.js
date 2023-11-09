var input = document.getElementById("search_bar");
var etiquetteDiv = document.getElementById('etiquettes');
var badges = etiquetteDiv.children;
var badges_textContent;
var filter = "name";
//la search bar et tous
input.addEventListener("input",function(){
    paginationWithEtiquette(1, null, badges_textContent, input.value,filter);
});

input.addEventListener("keydown",function(event){
    var inputValue = input.value.trim();
    if(event.keyCode === 13 && inputValue !== ""){
        const text = input.value;
        const badge = document.createElement('span');
        badge.textContent = text;
        badge.classList.add('badge', 'badge-success', 'gap-2', 'cursor-pointer');
        etiquetteDiv.appendChild(badge);
        input.value = '';
        badges_textContent = set_etiquette();
    }
});
//etiquette
etiquetteDiv.addEventListener("click", function(event){
    if(event.target.tagName === "SPAN"){
        //console.log("Cliqué sur une balise <span>.");
        event.target.parentNode.removeChild(event.target);
    }
    badges_textContent = set_etiquette();
    paginationWithEtiquette(1, null, badges_textContent, input.value,filter);
});

//request next or previous page
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("prevBtn").addEventListener("click",function () {
        paginationWithEtiquette(null, '-1', badges_textContent, input.value,filter);
    });
    document.getElementById("nextBtn").addEventListener("click",function () {
        paginationWithEtiquette(null, '1', badges_textContent, input.value,filter);
    });

});

// select all button in page
var buttons = document.querySelectorAll('button');

// travel each button to add click event
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        // take text from button to print in logs and function
        var buttonText = parseInt(button.textContent);
        //console.log(buttonText);
        paginationWithEtiquette(buttonText, null, badges_textContent, input.value,filter);
    });
});
//function pagination click page and go to the page

function paginationWithEtiquette(page, direction, badges, term, filter){
    if (!isNaN(page)) {
        var dataToSend = {  page : page,
                            direction : direction,
                            badge : badges,
                            term : term,
                            filter: filter,
                            };
                            //console.log(badges,dataToSend.badge)
        $.ajax({
            type:"GET",
            url: "/fr_BE/frontend_contact/pagination/etiquette",
            dataType:'json',
            data:dataToSend,
            success: function(data){
                $.ajax({
                    type:"GET",
                    url: "/fr_BE/frontend_contact/contact",
                    success: function(voids){
                        console.log(data);
                        var row = document.querySelectorAll('table tr.contact');
                        var btnDiv = document.getElementById('pagesButtons');
                        btnDiv.textContent = '';
                        for (var i = 0; i < row.length; i++) {
                            var cells = row[i].querySelectorAll('td');
                            var name = data.cNom[i];
                            var mobile = data.cMobile[i];
                            var img = data.cImg[i];

                            if(name){
                            cells[0].querySelector('b').textContent = name;
                            cells[0].querySelector('img').src = img;//fonctionne pas comme je veux
                            cells[2].childNodes[1].id = name;
                            }else{
                            cells[0].querySelector('b').textContent = "";
                            cells[0].querySelector('img').src = "";
                            }

                            if (mobile){cells[1].textContent = mobile;}
                            else{cells[1].textContent = "";}
                        }

                        data.pages.forEach(function(item,index){
                            var btnNew = document.createElement('button');
                            btnNew.textContent = item;
                            btnNew.classList.add('join-item', 'btn');
                            btnNew.addEventListener('click', function() {
                                paginationWithEtiquette(item, null, badges_textContent, input.value,filter);
                            });
                            btnDiv.appendChild(btnNew);
                        });

                    },error: function (error2) {
                        console.error("Erreur de la deuxième requête AJAX");
                    }
                });
            },error: function (error2) {
                console.error("Erreur de la premier requête AJAX");
            }
        });
    }
}


//
var devi = document.querySelectorAll('input[value="devis"]');
devi.forEach(function(button) {
    button.addEventListener("click",function(){
        var name = button.id;
        console.log(name);
        var dataToSend = {  name : name,}
        $.ajax({
            type:"GET",
            dataType:'json',
            url: "/fr_BE/frontend_contact/contact/devis",
            data:dataToSend,
            success: function(data){
                $.ajax({
                    type:"GET",
                    url: "/fr_BE/frontend_contact/contact",
                    success: function(voids){
                        console.log(data);
                        var tableContainer = document.getElementById('deviTable');
                        tableContainer.innerHTML = '';
                        var table = document.createElement('table');
                        var thead = document.createElement('thead');
                        var headerRow = thead.insertRow();
                        headerRow.insertCell(0).textContent = 'Nom';
                        headerRow.insertCell(1).textContent = 'Date';
                        headerRow.insertCell(2).textContent = 'Vendeur';
                        headerRow.insertCell(3).textContent = 'Prix';
                        table.appendChild(thead);
                        var tbody = document.createElement('tbody');
                        for (var i = 0; i < data.name.length; i++) {
                            var row = tbody.insertRow();
                            row.insertCell(0).textContent = data.name[i];
                            row.insertCell(1).textContent = data.date[i];
                            row.insertCell(2).textContent = data.seller[i];
                            row.insertCell(3).textContent = data.price[i];
                        }
                        table.appendChild(tbody);
                        tableContainer.appendChild(table);

                    },error: function (error2) {
                        console.error("Erreur de la deuxième requête AJAX");
                    }
                });
            },error: function (error) {
                console.error("Erreur de la requête AJAX");
            }
        });
    });
});

function set_etiquette(){
    var badges_textContent = [];
    if (badges.length > 2){
        for (var i = 2; i < badges.length; i++) {
            badges_textContent.push(badges[i].textContent);
        }
        console.log(badges_textContent);
    }else{
        badges_textContent = null;
    }
    return badges_textContent;
}
//button in order mobile or name
let NomInOrder = document.getElementById("NomInOrder");
let MobileInOrder = document.getElementById("MobileInOrder");
NomInOrder.addEventListener("click",function(){
    buttonInOrder(NomInOrder,MobileInOrder);
});

MobileInOrder.addEventListener("click",function(){
    buttonInOrder(MobileInOrder,NomInOrder);
});

function buttonInOrder(InOrder,NotInOrder){
    switch(InOrder.value){
        case "▲▼":
            InOrder.value = "▼";
            NotInOrder.value = "▲▼";
            break;
        case "▲":
            InOrder.value = "▼";
            NotInOrder.value = "▲▼";
            break;
        case "▼":
            InOrder.value = "▲";
            NotInOrder.value = "▲▼";
            break;
    }
    getInOrder(InOrder,InOrder.value);
}

function getInOrder(who, is){
    if(who === document.getElementById("MobileInOrder")){
        switch(who.value){
            case "▲":
                //récupéré le tableau ordre decroisans avec les nom
                filter = "mobile desc";
                break;

            case "▼":
                //récupéré le tableau ordre croissans(pas grand chose)
                filter = "mobile";
                break;
        }
    }
    if(who === document.getElementById("NomInOrder")){
        switch(is){
            case "▲":
                //récupéré le tableau ordre decroisans avec les mobile
                filter = "name desc";
                break;

            case "▼":
                //récupéré le tableau ordre croisans avec les mobile
                filter = "name";
                break;
        }
    }
    paginationWithEtiquette(1, null, badges_textContent, input.value, filter);
}