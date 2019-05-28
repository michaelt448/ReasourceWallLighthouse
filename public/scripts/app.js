

$(document).ready(function () {
  $(".new-url").hide();
  $(".no-entry").hide()


  const $grid = $(".grid").masonry({
    itemSelector: ".grid-item",
    columnWidth: 200,
    gutter: 15
  });

  function createTile(resource){
    let background = $('<div>');
    background.addClass('background');
    const imgURL = resource.url_img;
    background.css("background", "url(" + imgURL + ")" + " center / cover no-repeat");
    let newDiv = $("<div>");
    newDiv.append(background);
    newDiv.addClass("eachResource grid-item");
    $("<div>").addClass("title dataResource").text(resource.title).appendTo(newDiv);
    $("<div>").addClass("description dataResource ").text(resource.description).appendTo(newDiv);
    $("<div>").addClass("category dataResource ").text(resource.category).appendTo(newDiv);
    let newLink = $("<a>").attr("href", `/${resource.id}`)
    newDiv.appendTo(newLink);
    newLink.prependTo($(".existing-resource"));
    $grid.masonry('prepended', newLink);
  }



  $(() => {
    $.ajax({
      method: "GET",
      url: "api/resources/",
    }).done((resources) => {
      for (let resource of resources) {
        createTile(resource);
      }

    });
  });
  const addButton = $("#nav-bar .add-button");
  addButton.on("click", function () {
    const newResourceSection = $(".new-url");
    if (newResourceSection.is(":hidden")) {
      newResourceSection.slideDown("slow");
      $(".url-area").focus();
    } else {
      newResourceSection.slideUp("slow");
    }
  });

  const submitButton = $(".add-resource");
  submitButton.on("click", function (event) {
    event.preventDefault();

    let idtest = document.cookie.split('=')[1];

    const data = {
      url: $(".url-area").val(),
      title: $(".title-area").val(),
      description: $(".descr-area").val(),
      user_id: idtest,
      category: $(".cat-area").val(),
      url_img: $(".img-area").val()
    };
    $.ajax({
      method: "POST",
      url: "api/resources",
      data: data
    }).done((response) => {
      const resourceInfo = response.result[0];
      createTile(resourceInfo);
    });
  });

  //if search term is blank load all resources or just send error message
  const searchBar = $(".searchbar a");
  searchBar.on('click', function (event) {
    var data = $(".search_input").val().toLowerCase();

    if (data === "") {
      $(".no-entry").slideDown("slow");
    } else {
      $(".no-entry").hide()
      $.ajax({
        url: '/api/resources/search/' + data,
        method: 'GET',
        dataType: 'json',
        error: function (err) {
          console.log("we are not good ", err);
        }
      }).done((resources) => {

        $(".grid").html("");
        for (let resource of resources) {
          createTile(resource);
        }
      });
    }

  });







});