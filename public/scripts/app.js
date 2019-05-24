$(document).ready(function(){
  // $(() => {
  //   $.ajax({
  //     method: "GET",
  //     url: "/api/users"
  //   }).done((users) => {
  //     for(user of users) {
  //       $("<div>").text(user.name).appendTo($("body"));
  //     }
  //   });;
  // });
    const logInButton = $('button.login');
    const likeButton = $('button.like');
    const user_id = $('input');

    const renderPage = () => {
      $.get('api/resources/:id')
      .then(function(response){
        response.json();
      })
      .then(function(object)) {
        if($.cookie('user_id')) {
          renderUserSpecificPage(object);
        } else {
          renderPublicPage(object);
        }
      } 
    }

    function checkCookie() {
      console.log($.cookie('user_id'));
    }

    likeButton.on('click', function(e) {
      e.preventDefault();
      $.post('/api/resources')
    })

    logInButton.on('click', function(e) {
      console.log('the text value is ' + user_id.val());
      e.preventDefault();
      $.post('/api/resources/login',{user_id: user_id.val()}, () => {
      console.log('I posted a login');
      });
    }) 

    //renderPage()
    checkCookie();
})
