// jQuery(document).ready(function(){
// $('.main').addClass('fadeInRight');
// });

function animateAndSterilize(target, animation, callback) {
    target.addClass(animation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        target.removeClass(animation);
        if(callback && typeof callback == "function"){
          callback();
        }
    });
}



$(function() {
    $('.fa').tooltip();

    pages = {
        '#about': ".about-section",
        '#blog': ".blog",
        '#contact': ".contact",
        '#menu': ".main",
    };

    stateInfo = {};
    stateInfo.lastState = "#menu";

    var transitionHandler = function(e) {
      currHash = window.location.hash;
      if(!currHash) return;
      // if(currHash = "#menu"){

      // }
      // console.log(pages[currHash]);
      if(currHash != "#menu"){
        $(".back-button").removeClass("hidden");
        animateAndSterilize($(".back-button"), 'animated slideInDown')
      } else {
        animateAndSterilize($(".back-button"), 'animated slideOutUp', function() {
          $(".back-button").addClass("hidden");
        });
      }
      console.log(pages[stateInfo.lastState]);
      animateAndSterilize( $(pages[stateInfo.lastState]) , 'animated slideOutLeft', function() {
        $(pages[stateInfo.lastState]).addClass('hidden');
        $(pages[currHash]).removeClass("hidden");

        animateAndSterilize($(pages[currHash]), 'animated slideInRight'); 
        stateInfo.lastState = currHash;
      });
      // $(pages[stateInfo.lastState]).addClass('animated slideOutLeft')
      //     .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      //         $(pages[stateInfo.lastState]).addClass('hidden');
      //         $(pages[currHash]).removeClass("hidden");
      //         $(pages[currHash]).addClass('animated slideInRight');
      //       });
      
      // window.location.hash = '';
    }

    $(window).on('hashchange', transitionHandler);

    transitionHandler();
    // $("#aboutPage").click(function(event) {
    //   event.preventDefault()
    //   $('#mainPage').css('z-index', -1000);
    //   $('#mainPage').addClass('animated slideOutDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    //     $('#mainPage').addClass('hidden');
    //     $('.about-section').removeClass('hidden');
    //     $('.about-section').addClass('animated slideInRight')
        
    //   });
    // });
    // $("#blogPage").click(function() {
    //   alert("blog");
    // });
    // $("#contactPage").click(function() {
    //   alert("contact");
    // });
    // $("#cvPage").click(function() {
    //   alert("cv");
    // });

});
