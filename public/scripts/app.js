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
      $.post('api/resource'
      )
    })

    logInButton.on('click', function(e) {
      $.post('api/resource',user_id)
    }) 
})