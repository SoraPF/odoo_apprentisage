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

document.getElementById("submitButton").addEventListener("click", function () {
    var inputData = input.value.toLowerCase();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/frontend_contact/contact", true);
    xhr.setRequestHeader("content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({data: inputData}));

    xhr.onload = function (){
        if (xhr.status === 200) {
            // Réponse du serveur. Vous pouvez traiter la réponse ici.

            alert("ce que je doit avoir: " + inputData + "\nRéponse du serveur : " + xhr.responseText);
            console.log("ce que je doit avoir: " + inputData + "\nRéponse du serveur : " + xhr.responseText)
        }
    };
});