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
    const likeButton = $('button.likeButton');
    const user_id = $('input');

    const renderPage = () => {
      console.log('I am in render page');
      $.get('/api/resources/'+ 1) //---->>> 2 is resource id, hardcoded
      // .then(response =>
      //   response.json()
      // )
      .then((object) => {
        if(Cookies.get('user_id') === undefined) {
          renderUserPublicPage(object);
          console.log('i am public');
        } else {
          // renderUserSpecificPage(object[0]);
          console.log('i am private');
        }
      }) 
    }

    const renderUserPublicPage = (resource) => {
      console.dir(resource);
      renderComments(resource.comments);
      renderLikes(resource.likes);
      renderRank(resource.ranks);
      renderResources(resource.resourceProperties[0]);
      // $('div')
      // .append(`<p> This is resource url : ${resource.url}</p>`)
      // .append(`<p> This is when resource created : ${resource.created_at}</p>`)
      // .append(`<p> This is resource title : ${resource.title}</p>`)
      // .append(`<p> This is resource image : ${resource.url_img}</p>`)
      // .append(`<p> This is resource description : ${resource.description}</p>`)
    }
    const renderComments = (comments) => {
      console.log('inside the render comments I', comments);
      for(comment of comments) {
        console.log(comment);
        $('.comments').append(renderComment(comment));
      }
    }

    const renderComment = (comment) => {
      const newArticle = $('<article>').addClass('comment');
 
      const header = $('<p>').addClass('comment-header').text(comment.user_id);
      const parag = $('<p>').addClass('comment-text').text(comment.comment);
      const footer = $('<p>').addClass('comment-text').text(comment.created_at);
  
      return newArticle.append(header, parag, footer);
    }

    const renderLikes = (like) => {
      const count = like[0].count;
      $('.like').append($('<p>').text(count));
    }

    const renderRank = (rank) => {
      const avg_rank = parseInt(rank[0].avg);
      $('.rankBox').append($('<p>').text(avg_rank));
    }

    const renderResources = (properties) => {
      console.dir(properties); 
      $('div.properties')
      .append(`<p> This is resource url : ${properties.url}</p>`)
      .append(`<p> This is when resource created : ${properties.create_at}</p>`)
      .append(`<p> This is resource title : ${properties.title}</p>`)
      .append(`<p> This is resource image : ${properties.url_img}</p>`)
      .append(`<p> This is resource description : ${properties.description}</p>`)
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
    // renderComments([
    //   {
    //     user_id : 2,
    //     comment: 'awesome',
    //     created_at: '2 min ago'
    //   },
    //   {
    //     user_id: 2,
    //     comment: 'the bestest alive',
    //     created_at: '10 min ago'
    //   }
    // ])
})
