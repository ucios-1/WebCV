

  $('.menuLines').click(function(){
    $(this).toggleClass('is-active');
    if($('#nav-move').hasClass('is-active')){
      $('#nav-move').toggleClass('is-inactive');
      $('.mainPanel').addClass('hidden');
      $('#flyingDots').removeClass('hidden');
      $('.logo').removeClass('hidden');
    } else {
      $('#nav-move').toggleClass('is-active');
    }
  });


  $('.previous').on('click', function() {
    $('.previous').fadeTo(300, 0);
    $('.left').fadeTo(300, 1);
    $('.right').fadeTo(500, 0);
    $('.next').fadeTo(500, 1);
  });
  $('.next').on('click', function() {
    $('.next').fadeTo(300, 0);
    $('.right').fadeTo(300, 1);
    $('.right').removeClass('invisible');
    $('.previous').removeClass('invisible');
    $('.previous').fadeTo(500, 1);
    $('.left').fadeTo(500, 0);
  });

  $('#aboutBttn').on('click', event => {
    remIDs();
    $('.mainPanel').removeClass('hidden');
    $('#about').removeClass('hidden');
  });
  $('#projectBttn').on('click', event => {
    remIDs();
    $('.mainPanel').removeClass('hidden');
    $('#projects').removeClass('hidden');
  });
  $('#contactBttn').on('click', event => {
    remIDs();
    $('.mainPanel').removeClass('hidden');
    $('#contact').removeClass('hidden');
    $('#contact').show();
  });

  $('.tile').on('mouseover', function(){
      $(this).children('.photo').css({
        'transform': 'scale('+ $(this).attr('data-scale') +')'
      });
    }).on('mouseout', function(){
      $(this).children('.photo').css({
        'transform': 'scale(1)'
      });
    }).on('mousemove', function(e){
      $(this).children('.photo').css({
        'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'
      });
    });

    $('.mailBox').on('mouseover', function(){
      $(this).children('.photo').css({
        'transform': 'scale('+ $(this).attr('data-scale') +')'
      });
    }).on('mouseout', function(){
      $(this).children('.photo').css({
        'transform': 'scale(1)'
      });
    }).on('mousemove', function(e){
      $(this).children('.photo').css({
        'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'
      });
    });

    $('#contact').on('mouseover', function(){
      $('.mailBox').children('.photo').css({
        'transform': 'scale('+ $('.mailBox').attr('data-scale') +')'
      });
    }).on('mouseout', function(){
      $('.mailBox').children('.photo').css({
        'transform': 'scale(1)'
      });
    }).on('mousemove', function(e){
      $('.mailBox').children('.photo').css({
        'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'
      });
    });

    $('.tile').on('click', event => {
      remClass();
      $('.langDescr').toggleClass('hidden');
      if($(event.currentTarget).hasClass('JQ')){
        showTriangle('JQ');
        $('.JQDescr').toggleClass('hidden');
      } else if($(event.currentTarget).hasClass('JS')){
        showTriangle('JS');
        $('.JSDescr').toggleClass('hidden');
      } else if($(event.currentTarget).hasClass('CSS')){
        showTriangle('CSS');
        $('.CSSDescr').toggleClass('hidden');
      } else if($(event.currentTarget).hasClass('HTML5')){
        showTriangle('HTML5');
        $('.HTML5Descr').toggleClass('hidden');
      } else if($(event.currentTarget).hasClass('CSh')){
        showTriangle('CSh');
        $('.CShDescr').toggleClass('hidden');
      }
    });

    /*$(document).keypress("i", function(e) {
      if(e.ctrlKey && e.shiftKey){
        $('.nice').toggleClass('hidden');
      }
    });*/

    // functions
    function showTriangle(place){
      $('.triangle').removeClass('hidden');
      switch (place){
        case 'JQ':
          $('.triangle').css('left', '86.8%');
          break;
        case 'JS':
          $('.triangle').css('left', '67%');
          break;
        case 'CSS':
          $('.triangle').css('left', '47.4%');
          break;
        case 'HTML5':
          $('.triangle').css('left', '27%');
          break;
        case 'CSh':
          $('.triangle').css('left', '7%');
      }
    };

    function remIDs(){
      $('#flyingDots').addClass('hidden');
      $('#about').addClass('hidden');
      $('#projects').addClass('hidden');
      $('#contact').addClass('hidden');
      $('#contact').hide();
      $('.logo').addClass('hidden');
    };

    function remClass(){
      $('.triangle').addClass('hidden');
      $('.langDescr').addClass('hidden');
      $('.CShDescr').addClass('hidden');
      $('.HTML5Descr').addClass('hidden');
      $('.CSSDescr').addClass('hidden');
      $('.JSDescr').addClass('hidden');
      $('.JQDescr').addClass('hidden');
    };
