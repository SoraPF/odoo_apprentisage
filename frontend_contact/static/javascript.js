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

var xhr = new XMLHttpRequest();
xhr.open("GET", "/frontend_contact/contact", true);
xhr.send();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var responseData = JSON.parse(xhr.responseText);

    }
};
