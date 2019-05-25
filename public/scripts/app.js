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

    const renderPage = () => {
      console.log('I am in render page');
      $.get('/api/resources/'+ 2) //---->>> 2 is resource id, hardcoded
      // .then(response =>
      //   response.json()
      // )
      .then((object) => {
        console.log(object);
        if(Cookies.get('user_id') === undefined) {
          renderUserPublicPage(object[0]);
          console.log('i am public');
        } else {
          // renderUserSpecificPage(object[0]);
          console.log('i am private');
        }
      }) 
    }

    const renderUserPublicPage = (resource) => {
      console.dir(resource);
      const comments = renderComments(resource.comments);
      const likes = renderLikes(resource.likes);
      const ranks = renderRanks(resource.ranks);
      const property= renderResources(resource.resourceProperties);
      // $('div')
      // .append(`<p> This is resource url : ${resource.url}</p>`)
      // .append(`<p> This is when resource created : ${resource.created_at}</p>`)
      // .append(`<p> This is resource title : ${resource.title}</p>`)
      // .append(`<p> This is resource image : ${resource.url_img}</p>`)
      // .append(`<p> This is resource description : ${resource.description}</p>`)
    }
    const renderComments = (comments) => {
      for(comment in comments) {
        $('.comments').append(renderComment(comment));
      }
    }

    const renderComment = (comment) => {
      const newArticle = $('<article>').addClass('comment');

      const header = $('<header>').addClass('comment-header').text(comment.user_id);
      const parag = $('<p>').addClass('comment-text').text(comment.comment);
      const footer = $('<p>').addClass('comment-text').text(comment.created_at);
  
      return newArticle.append(header, parag, footer);
    }
    const renderUserSpecificPage = (resource) => {
      console.log('I am in the private mode' + resource);
    }

    likeButton.on('click', function(e) {
      e.preventDefault();
      $.post('/api/resources')
    })

    logInButton.on('click', function(e) {
      console.log('the text value is ' + user_id.val());
      e.preventDefault();
      Cookies.set('user_id',user_id.val());
      renderPage();
      // $.post('/api/resources/login',{user_id: user_id.val()}, () => {
      // console.log('I posted a login');
      // });
    }) 

    renderPage()
    // checkCookie();
    //Cookies.set()
})
