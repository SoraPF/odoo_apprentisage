var input = document.getElementById("search_bar");
var etiquetteDiv = document.getElementById('etiquettes');

//la search bar et tous
input.addEventListener("input",function(){
    pagination(1,null,input.value);
});

input.addEventListener("keydown",function(event){
    if(event.keyCode === 13){
        const text = input.value;
        const badge = document.createElement('span');
        badge.textContent = text;
        badge.classList.add('badge', 'badge-success', 'gap-2');
        etiquetteDiv.appendChild(badge);
        input.value = '';
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
function pagination(newPage, direction,term) {
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
            data: dataToSend,
            success: function (data) {
                // Deuxième requête AJAX pour récupérer des données supplémentaires
                $.ajax({
                    type: "GET",
                    url: "/fr_BE/frontend_contact/contact",
                    success: function (data2) {
                        //console.log(data);
                        // Mettez à jour l'élément HTML avec les données renvoyées par la première requête
                        document.getElementById("table").innerHTML = data;
                        //console.log(data2);
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
