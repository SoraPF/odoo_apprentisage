var input = document.getElementById("search_bar");
var table = document.getElementById("table");
var rows = Array.from(table.rows);
input.addEventListener("input", function() {
    var searchValue = input.value.toLowerCase(); // Convertir en minuscules pour une comparaison insensible à la casse
    rows.forEach(function(row) {
        var cells = Array.from(row.cells);
        cells.forEach(function(cell) {
            var cellText = cell.textContent.toLowerCase(); // Convertir en minuscules pour une comparaison insensible à la casse
            if (cellText.includes(searchValue)) {  //si la valeur appartien a la cellules
                cell.style.backgroundColor = "yellow"; // Mettre en évidence les cellules correspondantes
            } else {
                cell.style.backgroundColor = ""; // Réinitialiser la couleur de fond des autres cellules
            }
        });
    });
});