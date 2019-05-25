

$(document).ready(function() {

  $(".new-url").hide();

  $(() => {
    $.ajax({
      method: "GET",
      url: "api/resources"
    }).done((resources) => {
      for(let resource of resources) {
        let newDiv = $("<div>");
        newDiv.addClass("eachResource grid-item");
        $("<div>").addClass("title dataResource").text(resource.title).appendTo(newDiv);
        $("<div>").addClass("description dataResource ").text(resource.description).appendTo(newDiv);
        $("<div>").addClass("category dataResource ").text(resource.category).appendTo(newDiv);
        newDiv.prependTo($(".existing-resource"));


        const imgURL = resource.url_img;
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
    const body = $(this)
      .parent()
      .parent();
    const newResourceSection = $(body.find(".new-url")); 
    if (newResourceSection.is(":hidden")) {
      newResourceSection.slideDown();
      $("url-area").focus();
    } else {
      newResourceSection.slideUp();
    }
  });

  const submitButton = $(".add-resource");
  submitButton.on("click", function() {
    event.preventDefault();
    console.log("Clicked");
  });
  
  // $('.input').focus(function(){
  //   $(this).parent().find(".label-txt").addClass('label-active');
  // });

  // $(".input").focusout(function(){
  //   if ($(this).val() == '') {
  //     $(this).parent().find(".label-txt").removeClass('label-active');
  //   };
  // });


});