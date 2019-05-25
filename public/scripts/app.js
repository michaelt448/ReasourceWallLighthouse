

$(document).ready(function() {

  $(".new-url").hide();

  $(() => {
    $.ajax({
      method: "GET",
      url: "api/resources"
    }).done((resources) => {
      for(let resource of resources) {
        console.log("here");
        console.log("resource", resource);
        console.log(resource.url);
        let newDiv = $("<div>");
        newDiv.addClass("eachResource grid-item");
        $("<div>").addClass("title dataResource").text(resource.title).appendTo(newDiv);
        $("<div>").addClass("description dataResource ").text(resource.description).appendTo(newDiv);
        $("<div>").addClass("category dataResource ").text(resource.category).appendTo(newDiv);
        newDiv.prependTo($(".existing-resource"));


        const imgURL = resource.url_img;
        console.log(imgURL)
        newDiv.css("background", "url(" + imgURL + ")" + " center / cover no-repeat");

      }
      $(".grid").masonry({
        itemSelector: ".grid-item",
        columnWidth: 200,
        gutter:15
      });
    });
  });

  const addButton = $("#nav-bar .add-button");
  addButton.on("click", function() {
    console.log("Clicked!");
    const body = $(this)
      .parent()
      .parent();
    const newResourceSection = $(body.find(".new-url")); 
    if (newResourceSection.is(":hidden")) {
      console.log(newResourceSection[0]);
      newResourceSection.slideDown();
      $("url-area").focus();
    } else {
      newResourceSection.slideUp();
    }
  });


  $('.input').focus(function(){
    $(this).parent().find(".label-txt").addClass('label-active');
  });

  $(".input").focusout(function(){
    if ($(this).val() == '') {
      $(this).parent().find(".label-txt").removeClass('label-active');
    };
  });


});