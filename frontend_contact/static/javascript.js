var input = document.getElementById("search_bar");
var etiquetteDiv = document.getElementById('etiquettes');
var badges = etiquetteDiv.children;
//la search bar et tous
input.addEventListener("input",function(){
var badges_textContent = []
if (badges.length > 2){
    for (var i = 2; i < badges.length; i++) {
        badges_textContent.push(badges[i].textContent);
    }
    console.log(badges_textContent);
}else{
    badges_textContent = null;
}

    paginationWithEtiquette(1, null, badges_textContent, input.value);
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
    }
});
//etiquette
etiquetteDiv.addEventListener("click", function(event){
    if(event.target.tagName === "SPAN"){
        //console.log("Cliqué sur une balise <span>.");
        event.target.parentNode.removeChild(event.target);
    }
});

//request next or previous page
document.addEventListener("DOMContentLoaded", function () {
document.getElementById("prevBtn").addEventListener("click",function () {
    pagination(null,'-1', input.value);
});
document.getElementById("nextBtn").addEventListener("click",function () {
    pagination(null,'1', input.value);
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
        pagination(buttonText,null,input.value);

    });
});
//function pagination click page and go to the page
function pagination(newPage, direction, term){
    if (!isNaN(newPage)) {
        var dataToSend = {
            newPage: newPage,
            direction: direction,
            term: term
        };

        // Première requête AJAX pour récupérer les données
        $.ajax({
            type: "GET",
            url: "/fr_BE/frontend_contact/PagesButtons",
            dataType:'json',
            data: dataToSend,
            success: function (data) {
                // Deuxième requête AJAX pour récupérer des données supplémentaires
                $.ajax({
                    type: "GET",
                    url: "/fr_BE/frontend_contact/contact",
                    success: function (data2) {
                        console.log(data);
                        var row = document.querySelectorAll('table tr');
                        var btnDiv = document.getElementById('pagesButtons');
                        btnDiv.textContent = '';
                        for (var i = 1; i < row.length; i++) {
                            var cells = row[i].querySelectorAll('td');
                            var name = data.contact_name[i-1];
                            var mobile = data.contact_mobile[i-1];

                            if(name){
                            cells[0].textContent = name;
                            cells[2].childNodes[1].id = name;
                            }else{
                            cells[0].textContent = "";
                            cells[2].childNodes[1].id = "";
                            }

                            if (mobile){cells[1].textContent = mobile;}
                            else{cells[1].textContent = "";}
                        }

                        data.pages.forEach(function(item,index){
                            var btnNew = document.createElement('button');
                            btnNew.textContent = item;
                            btnNew.classList.add('join-item', 'btn');
                            btnNew.addEventListener('click', function() {
                                pagination(item,null,input.value);
                            });
                            btnDiv.appendChild(btnNew);
                        });
                    },
                    error: function (error2) {
                        // Gérer les erreurs de la deuxième requête
                        console.error("Erreur de la deuxième requête AJAX");
                    }
                });
            },
            error: function (error) {
                // Gérer les erreurs de la première requête
                console.error("Erreur de la première requête AJAX");
                console.log(error);
            }
        });
    }
}

function paginationWithEtiquette(page, direction, badges, term){
    if (!isNaN(page)) {
        var dataToSend = {  page : page,
                            direction : direction,
                            badge : badges,
                            term : term
                            };
                            //console.log(badges,dataToSend.badge)
        $.ajax({
            type:"GET",
            url: "/fr_BE/frontend_contact/pagination/etiquette",
            data:dataToSend,
            success: function(data){
                $.ajax({
                    type:"GET",
                    url: "/fr_BE/frontend_contact/contact",
                    success: function(){
                        document.getElementById("table").innerHTML = data;

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
            url: "/fr_BE/frontend_contact/contact/devis",
            data:dataToSend,
            success: function(data){
                console.log(data);
                 document.getElementById("table").innerHTML = data;
            },error: function (error2) {
                console.error("Erreur de la deuxième requête AJAX");
            }
        });
    });
});

