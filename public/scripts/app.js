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
})