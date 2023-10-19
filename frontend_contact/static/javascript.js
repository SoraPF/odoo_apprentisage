var input = document.getElementById("search_bar");
var table = document.getElementById("table");
var rows = Array.from(table.rows);
var testing = document.getElementById("test")
/*
//highlight
input.addEventListener("input", function() {
    var searchValue = input.value.toLowerCase(); // Convertir en minuscules pour une comparaison insensible à la casse
    rows.forEach(function(row) {
        var cells = Array.from(row.cells);
        cells.forEach(function(cell) {
            var cellText = cell.textContent.toLowerCase(); // Convertir en minuscules pour une comparaison insensible à la casse
            if (cellText.includes(searchValue)) {  //si la valeur appartien a la cellules
                cell.style.backgroundColor = "#6d071a"; // Mettre en évidence les cellules correspondantes
            } else {
                cell.style.backgroundColor = ""; // Réinitialiser la couleur de fond des autres cellules
            }
        });
    });
});
*/
//ajax
/*
input.addEventListener("input", function() {
    var inputData = input.value.toLowerCase();//var qui contient ce que balise search_bar en minuscule
    var xhr = new XMLHttpRequest();//creer une nouvelle requet http
    xhr.open("POST", "/frontend_contact/contact", true);//ou en vas take/drop les information
    xhr.setRequestHeader("content-Type", "application/json;charset=UTF-8");//comment lire
    xhr.send();//envoyer au serveur data

    xhr.onload = function (){
        if (xhr.status === 200) {
            // Réponse du serveur. Vous pouvez traiter la réponse ici.
            document.getElementById('list_contact_page').innerHTML = xhr.responseText;
            console.log("ce que je doit avoir: " + inputData + "\nRéponse du serveur : " + xhr.responseText)
        }
    };
});
*/
//table by 10
document.addEventListener("DOMContentLoaded", function () {
document.getElementById("prevBtn").addEventListener("click",function (e) {
    e.preventDefault();
    pagination('-1', input.value);
});
document.getElementById("nextBtn").addEventListener("click",function (e) {
    e.preventDefault();
    pagination('1', input.value);
});

function pagination(direction,term){
    var dataToSend = {direction : direction,term : term};
    $.ajax({
        type:"GET",
        url:"/fr_BE/frontend_contact/contact",
        data: dataToSend,
        success:function(data){
            $('#myForm').submit();
        }
    });
}
});