$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
    //url: "/resource"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
