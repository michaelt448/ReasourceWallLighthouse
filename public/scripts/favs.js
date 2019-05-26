$(document).ready(function () {
    console.log("here in favs.js");


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
      
      // let id = Cookie.get('user_id');
      let idtest  = document.cookie.split('=')[1];
      console.log('Favs cookie:  ' + idtest);
      // logged in user ???
      let id = '1';
      $(() => {
        $.ajax({
          method: "GET",
          //url: "api/resources"
          // url: "api/resources/" + id + "/favorites"
          url: "api/resources/" + idtest + "/favorites".slice,
          data: {user_id : Cookies.get('user_id')}
        }).done((resources) => {
          for(let resource of resources) {
            createTile(resource);
          }
          
        });
      });
});