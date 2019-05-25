$(document).ready(function(){
    const logInButton = $('button.login');
    const likeButton = $('button.likeButton');
    const user_id = $('input');

    const renderPage = () => {
      console.log('I am in render page');
      $.get('/api/resources/'+ 3) //---->>> 2 is resource id, hardcoded
      .then((object) => {
        console.log(object);
        if(Cookies.get('user_id') === undefined) {
          renderUserPublicPage(object);
          console.log('i am public');
        } else {
          renderUserSpecificPage(object);
          console.log('i am private');
        }
      }) 
    }

    const renderUserSpecificPage = (resource) => {
      console.dir(resource);
      renderComments(resource.comments); 
      renderLikes(resource.likes);
      renderRank(resource.ranks);
      renderResources(resource.resourceProperties[0]);
      checkPersonalLike(resource.personalLike);
      checkPersonalRank(resource.renderPersonalRank);
      renderCommentBox();
    }
    const renderComments = (comments) => {
      for(comment of comments) {
        // console.log(comment);
        $('.comments').append(renderComment(comment));
      }
    }

    const renderCommentBox = () => {
      // very dirty code, this is to make the text box appear dynamically
      $('.comments').append("<form class='commentBox'type = 'POST' action='/resources:id/comment'><textarea name='text' placeholder='Leave your thoughts below!!'></textarea><input type='submit' value='Comment'></form>")
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

    const checkPersonalRank = (personRanks) => {
      if(personRanks === undefined) {
        return;
      } 
      for(personalRank in personalRanks) {
        if(personalRank.user_id === Cookies.get('user_id')){
          $('.personalRank').append(`<p>${personalRank.rank_value}</p>`);
          return;
        }
      }
      console.log(personRanks)
    }

    const checkPersonalLike = (personLikes) => {
      if(personalLikes === undefined) {
        return;
      }
      for(personalLike in personalLikes) {
        if(personalLike.user_id === Cookies.get('user_id')){
          $('.personalLike').append('<p> LIKED </p>');
          return;
        }
      } 
      $('.personalLike').append('<p> NOT LIKED </p>');
      console.log(personLikes);
    }

    const renderUserPublicPage = (resource) => {
      renderLikes(resource.likes);
      renderRank(resource.ranks);
      renderResources(resource.resourceProperties[0]);
      renderComments(resource.comments); 
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
