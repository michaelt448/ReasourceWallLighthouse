$(document).ready(function(){
    const logInButton = $('button.login');
    const likeButton = $('button.likeButton');
    const unLikeButton = $('button.unLikeButton')
    const user_id = $('input');
    const rankButton = $('input.rankButton');
    const rankValue = $('select option')

    const renderPage = () => {
      $('#anchor').empty();
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
      renderComments(resource.comments) 
      renderLikes(resource.likes)
      renderRank(resource.ranks)
      renderResources(resource.resourceProperties[0])
      checkPersonalLike(resource.personalLike)
      checkPersonalRank(resource.renderPersonalRank)
      renderCommentBox()
      
      
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
      $('.totalLike').empty();
      const count = like[0].count;
      $('.totalLike').append($('<p>').text(`There are ${count} likes`));
    }

    const renderRank = (rank) => {
      $('.averageRank').empty();
      console.log(rank[0].avg);
      if(rank[0].avg === null) {
         $('.averageRank').append($('<p>').text('No rank'));
      }
      else {
      const avg_rank = parseInt(rank[0].avg);
       $('.averageRank').append($('<p>').text(avg_rank));
      }
    }

    const renderResources = (properties) => {
      // console.dir(properties); 
      // const propertyTag = $('div').addClass('Properties');
      $('div.properties').empty();
       $('div.properties')
      .append(`<p> This is resource url : ${properties.url}</p>`)
      .append(`<p> This is when resource created : ${properties.create_at}</p>`)
      .append(`<p> This is resource title : ${properties.title}</p>`)
      .append(`<p> This is resource image : ${properties.url_img}</p>`)
      .append(`<p> This is resource description : ${properties.description}</p>`)
      .addClass('properties');
       
    }

    const checkPersonalRank = (personalRanks) => {
      console.log(personalRanks)
      $('.personalRank').empty();
      if(personalRanks === undefined) {
         $('.personalRank').append(`<p> NO PERSONAL RANK</p>`);
      } 
      else {
      for(personalRank in personalRanks) {
        if(personalRank.user_id === Cookies.get('user_id')){
           $('.personalRank').append(`<p>${personalRank.rank_value}</p>`);
           return;
        }
      }
       $('.personalRank').append(`<p> NO PERSONAL RANK</p>`);
    }
  }

    const checkPersonalLike = (personalLikes) => {
      console.log('got into checkpersonalLikes');
      $('personalLike').empty();
      if(personalLikes === undefined) {
         $('.personalLike').append('<p> NOT LIKED </p>');
         $('form.like').show();
         $('form.unlike').hide();
      }
      else {
        console.log('got in defined');
      for(personalLike of personalLikes) {
        console.log('got into the personalLikes for loop');
        if(personalLike.user_id === parseInt(Cookies.get('user_id'))){
          // console.log('the cookie matches');
           $('.personalLike').append('<p> LIKED </p>');
           $('form.like').hide();
           $('form.unlike').show();
           return;
        }
      } 
       $('.personalLike').append('<p> NOT LIKED </p>');
       $('form.like').show();
       $('form.unlike').hide();
    }
  }

    const renderUserPublicPage = (resource) => {
      renderLikes(resource.likes)
      renderRank(resource.ranks)
      renderResources(resource.resourceProperties[0])
      renderComments(resource.comments)
      $('form.like').hide();
      $('form.unlike').hide();
      $('form.rankBox').hide();
      
    }

    likeButton.on('click', function(e) {
      e.preventDefault();
      console.log('inside the like button');
      $.post('/api/resources/'+ 3 + '/like',{user_id : Cookies.get('user_id')});
      renderPage();
      $('form.like').hide();
      $('form.unlike').show();
    })

    unLikeButton.on('click', function(e) {
      e.preventDefault();
      console.log('inside the unlike button');
      $.post('/api/resources/'+ 3 +'/like/delete',{user_id : Cookies.get('user_id')})
      // renderPage();
      });
    

    logInButton.on('click', function(e) {
      console.log('the text value is ' + user_id.val());
      e.preventDefault();
      Cookies.set('user_id',user_id.val());
      renderPage();
    }) 

    rankButton.on('click',function(e) {
      e.preventDefault();
      console.log('insde the rank button');
      // console.log(rankValue.val());
      $.post('/api/resources/'+ 3 + '/rank',{user_id : Cookies.get('user_id'),
    rank_value : parseInt(rankValue.val())});
    })

    renderPage()
    // $('#tweet-container').empty();
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
