$(document).ready(function() {

const logInButton = $(".login-button");   
logInButton.on('click', function(event) {
    event.preventDefault();
    const user_id = $(".userID");
    console.log('the text value is ' + user_id.val());
    Cookies.set('user_id',user_id.val());
    document.location.href="/";
    })

});