$(() => {
    $.ajax({
      method: "GET",
      url: "/api/users"
    }).done((users) => {
      for(user of users) {
        $("<div>").text(user.name).appendTo($("body"));
      }
    });;
  });
  
  $(document).ready(function() {
  
    // let initialHide = $(".new-tweet").hide();
    // $(".no-text").hide();
    // $(".too-long").hide();
  
    const input = $(".new-url input");
    input.on("click", function(event) {
      event.preventDefault();
  
  
  
  });