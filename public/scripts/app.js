

$(document).ready(function() {
  $(".new-url").hide();

  const $grid = $(".grid").masonry({
    itemSelector: ".grid-item",
    columnWidth: 200,
    gutter:15
  });

  function createTile(resource){
    console.log('resource', resource);
    let newDiv = $("<div>");
    newDiv.addClass("eachResource grid-item");
    $("<div>").addClass("title dataResource").text(resource.title).appendTo(newDiv);
    $("<div>").addClass("description dataResource ").text(resource.description).appendTo(newDiv);
    $("<div>").addClass("category dataResource ").text(resource.category).appendTo(newDiv);
    const imgURL = resource.url_img;
    newDiv.css("background", "url(" + imgURL + ")" + " center / cover no-repeat");
    console.log('newDiv', newDiv);
    newDiv.prependTo($(".existing-resource"));
    $grid.masonry( 'prepended', newDiv);
  }

  

  $(() => {
    $.ajax({
      method: "GET",
      url: "api/resources"
    }).done((resources) => {
      for(let resource of resources) {
        createTile(resource);
      }
      
    });
  });

  const addButton = $("#nav-bar .add-button");
  addButton.on("click", function() {
    const newResourceSection = $(".new-url"); 
    if (newResourceSection.is(":hidden")) {
      newResourceSection.slideDown();
      $(".url-area").focus();
    } else {
      newResourceSection.slideUp();
    }
  });

  const submitButton = $(".add-resource");
  submitButton.on("click", function(event) {
    event.preventDefault();

    let idtest  = document.cookie.split('=')[1];
    //console.log('Add user_id:  ' + idtest);

    const data = { 
      url: $(".url-area").val(),
      title: $(".title-area").val(),
      description: $(".descr-area").val(),
      /**test */
      user_id: idtest,
      /**test */
      category: $(".cat-area").val(),
      url_img: $(".img-area").val()
    };
    console.log('User_id: ' + data.user_id)
    $.ajax({
      method: "POST",
      url: "api/resources",
      data: data
    }).done((response) => {
      console.log(response);
      const resourceInfo = response.result[0];
      console.log("resourceinfo", resourceInfo);
      createTile(resourceInfo);
    });
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