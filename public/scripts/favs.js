

$(document).ready(function () {
    console.log("here in favs.js");
    let id = '1';
    $(() => {
        $.ajax({
            method: "GET",
            //url: "api/resources"
            url: "api/resources/" + id + "/favorites"
        }).done((resources) => {
            var imgURL = "";
            for (let resource of resources) {
                // console.log("here in favs.js");
                // console.log("resource", resource);
                console.log(resource.url);
                let newDiv = $("<div>");
                newDiv.addClass("eachResource grid-item");
                $("<div>").addClass("title dataResource").text(resource.title).appendTo(newDiv);
                $("<div>").addClass("description dataResource ").text(resource.description).appendTo(newDiv);
                $("<div>").addClass("category dataResource ").text(resource.category).appendTo(newDiv);
                newDiv.appendTo($(".existing-resource"));
                imgURL = resource.url_img;
                console.log(imgURL)
                newDiv.css("background", "url(" + imgURL + ")" + " center / cover no-repeat");
                // $("<div>").text(resource.url).appendTo($(".existing-resource"));
            }

            for (let resource of resources) {
                // console.log("here");
                // console.log("resource", resource);
                // console.log(resource.url);
                let newDiv = $("<div>");
                newDiv.addClass("eachResource grid-item");
                $("<div>").addClass("title dataResource").text(resource.title).appendTo(newDiv);
                $("<div>").addClass("description dataResource ").text(resource.description).appendTo(newDiv);
                $("<div>").addClass("category dataResource ").text(resource.category).appendTo(newDiv);
                newDiv.appendTo($(".existing-resource"));
                imgURL = resource.url_img;
                console.log(imgURL)
                newDiv.css("background", "url(" + imgURL + ")" + " center / cover no-repeat");
                // $("<div>").text(resource.url).appendTo($(".existing-resource"));
            }

            for (let resource of resources) {
                // console.log("here");
                // console.log("resource", resource);
                // console.log(resource.url);
                let newDiv = $("<div>");
                newDiv.addClass("eachResource grid-item");
                $("<div>").addClass("title dataResource").text(resource.title).appendTo(newDiv);
                $("<div>").addClass("description dataResource ").text(resource.description).appendTo(newDiv);
                $("<div>").addClass("category dataResource ").text(resource.category).appendTo(newDiv);
                newDiv.prependTo($(".existing-resource"));


                imgURL = resource.url_img;
                console.log(imgURL)
                newDiv.css("background", "url(" + imgURL + ")" + " center / cover no-repeat");
            }
            $(".grid").masonry({
                itemSelector: ".grid-item",
                columnWidth: 200
            });
        });
    });
});