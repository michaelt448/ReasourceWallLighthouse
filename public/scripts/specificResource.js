$(document).ready(function(){
    const logInButton = $('button.login');
    const likeButton = $('button.likeButton');
    const unLikeButton = $('button.unLikeButton')
    const user_id = $('input');
    const rankButton = $('input.rankButton');
    const commentButton = $('.commentBox input');
    const pathName = window.location.pathname;
    const pathInt = parseInt(pathName.slice(1,pathName.length));

    const renderPage = () => {
      $('#anchor').empty();
      // console.log('this is path name', pathInt);
      $.get('/api/resources/'+ pathInt) //---->>> 2 is resource id, hardcoded
      .then((object) => {
        console.log(object);
        if(Cookies.get('user_id') === undefined) {
          renderUserPublicPage(object);
          // console.log('i am public');
        } else {
          renderUserSpecificPage(object);
          // console.log('i am private');
        }
      }) 
    }

    const renderUserSpecificPage = (resource) => {
      renderComments(resource.comments); 
      renderLikes(resource.likes);
      renderRank(resource.ranks);
      renderResources(resource.resourceProperties[0]);
      checkPersonalLike(resource.personalLike);
      checkPersonalRank(resource.personalRank);
      $('.rankBox').show();
      $('.commentBox').show();
      
    }
    const renderComments = (comments) => {
      $('.comments').empty();
      const reverseComments = comments.reverse()
      for(comment of reverseComments) {
        // console.log(comment);
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
      const avg_rank = parseFloat(Math.round(rank[0].avg * 100) / 100).toFixed(2);
       $('.averageRank').append($('<p>').text(avg_rank));
      }
    }

    const renderResources = (properties) => {
      $('div.properties').empty();
      console.log(properties);
       $('div.properties')
      .append(`<p class = 'url'> This is resource url : <a href = "${properties.url}">${properties.url}</a></p>`)
      .append(`<p class = 'createdTime'> This is when resource created : ${properties.create_at}</p>`)
      .append(`<p class = 'title'> This is resource title : ${properties.title}</p>`)
      .append(`<img class = 'image' src = ${properties.url_img}>`)
      .append(`<p class = 'description'> This is resource description : ${properties.description}</p>`)
      .append(`<p class = 'category'> This is resource category : ${properties.category}</p>`)
      .addClass('properties');

    }

    const checkPersonalRank = (personalRanks) => {
      // console.log('I am inside the personalRanks');
      // console.log(personalRanks);
      $('.personalRank').empty();
      if(personalRanks === undefined) {
         $('.personalRank').append(`<p> NO PERSONAL RANK</p>`);
      } 
      else {
      for(personalRank of personalRanks) {
        // console.log('inside the personal Rank',personalRank);
        // console.log('the cookie to compare', Cookies.get('user_id'));
        if(personalRank.user_id === parseInt(Cookies.get('user_id'))){
           $('.personalRank').append(`<p>${parseInt(personalRank.rank_value)}</p>`);
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
      $('.commentBox').hide();
      
    }

    likeButton.on('click', function(e) {
      e.preventDefault();
      $.post('/api/resources/'+ pathInt + '/like',{user_id : Cookies.get('user_id')});
      renderPage();
      $('form.like').hide();
      $('form.unlike').show();
    })

    unLikeButton.on('click', function(e) {
      e.preventDefault();
      // console.log('inside the unlike button');
      $.post('/api/resources/'+ pathInt +'/like/delete',{user_id : Cookies.get('user_id')})
      });
    

    logInButton.on('click', function(e) {
      // console.log('the text value is ' + user_id.val());
      e.preventDefault();
      Cookies.set('user_id',user_id.val());
      renderPage();
    }) 

    rankButton.on('click',function(e) {
      e.preventDefault();
      const rankValue = $('select option:selected').val()
      $.post('/api/resources/'+ pathInt + '/rank',{user_id : Cookies.get('user_id'),
      rank_value : parseInt(rankValue)});
      renderPage();
    })

    commentButton.on('click', function(e) {
      e.preventDefault();
      const newComment = $('.commentBox textarea').val();
      // console.log('inside the comment');
      // console.log('the comment is ', newComment);
      $.post('/api/resources/'+ pathInt +'/comment', {user_id :Cookies.get('user_id'), comment : newComment})
      renderPage();
    })
    renderPage()
})
