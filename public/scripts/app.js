

$(document).ready(function() {

  $(".new-url").hide();
  // $(".no-text").hide();
  // $(".too-long").hide();

 

  const addButton = $("#nav-bar .add-button");
  addButton.on("click", function() {
    console.log("Clicked!");
    // const newResource = ($(".new-url"));
    const body = $(this)
      .parent()
      .parent();
    const newResourceSection = $(body.find(".new-url")); //can target this directly as always start at body automaticly
//$(this)closest('elemente.g. 'ul') best to use closest!!
    if (newResourceSection.is(":hidden")) {
      console.log(newResourceSection[0]);
      newResourceSection.slideDown();
      $("url-area").focus();
    } else {
      newResourceSection.slideUp();
    }
  });


  $(() => {
    $.ajax({
      method: "GET",
      url: "api/resources"
    }).done((resources) => {
      for(let resource of resources) {
        console.log("here app.js");
        console.log("resource", resource);
        console.log(resource.url);
        let newDiv = $("<div>");
        newDiv.addClass("eachResource grid-item");
        $("<div>").addClass("title dataResource").text(resource.title).appendTo(newDiv);
        $("<div>").addClass("description dataResource ").text(resource.description).appendTo(newDiv);
        $("<div>").addClass("category dataResource ").text(resource.category).appendTo(newDiv);
        newDiv.appendTo($(".existing-resource"));
        
        // $("<div>").text(resource.url).appendTo($(".existing-resource"));
      }for(let resource of resources) {
        console.log("here");
        console.log("resource", resource);
        console.log(resource.url);
        let newDiv = $("<div>");
        newDiv.addClass("eachResource grid-item");
        $("<div>").addClass("title dataResource").text(resource.title).appendTo(newDiv);
        $("<div>").addClass("description dataResource ").text(resource.description).appendTo(newDiv);
        $("<div>").addClass("category dataResource ").text(resource.category).appendTo(newDiv);
        newDiv.appendTo($(".existing-resource"));
        
        // $("<div>").text(resource.url).appendTo($(".existing-resource"));
      }for(let resource of resources) {
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
        // center/cover no-repeat
        //(background:url(imgURL});
      }
      $(".grid").masonry({
        itemSelector: ".grid-item",
        columnWidth: 200
      });
    });
  });

      //   <div class="title"> My Javascript Tips </div>
      //  <div class="description"> desc: top 10 info on javascript shortcuts </div>
      //  <div class="category"> back-end </div>
      //  <span>likes</span>
      //  <span>rating</span>

});