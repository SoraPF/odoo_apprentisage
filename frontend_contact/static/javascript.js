myFunction(){
// viens récupérer les id des balise pour leur information ou les modifier
    var input = document.getElementById("search_bar");
    var table = document.getElementById("bonjour");

    table.textContent = input.value;
}