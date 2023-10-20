var input = document.getElementById("search_bar");

//request next or previous page
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

// select all button in page
var buttons = document.querySelectorAll('button');

// travel each button to add click event
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        // take text from button to print in logs and function
        var buttonText = parseInt(button.textContent);
        console.log(buttonText);
        pagination(buttonText,input.value);
    });
});
//function pagination click page and go to the page
function pagination(newPage,term){
    if (!isNaN(newPage)){
        var dataToSend={newPage:newPage,direction : 0,term : term};
        $.ajax({
            type:"GET",
            url:"/fr_BE/frontend_contact/contact",
            data: dataToSend,
            success:function(data){
                $('#myForm').submit();
            }
        })
    }
}
