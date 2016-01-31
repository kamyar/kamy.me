// jQuery(document).ready(function(){
// $('.main').addClass('fadeInRight');
// });

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

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
    //
    var currYear = new Date().getFullYear();
    $('#footer-txt').text("Copyright &copy; 2010 - {0} Kamyar Ghasemlou".format(currYear));

    pages = {
        '#about': ".about-section",
        '#blog': ".blog",
        '#contact': ".contact",
        '#CV': ".cv-page",
        '#menu': ".main",
    };

    stateInfo = {};
    stateInfo.lastState = "#menu";

    var transitionHandler = function(e) {
      currHash = window.location.hash;
      if(!currHash) return;

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
    }

    $(window).on('hashchange', transitionHandler);

    transitionHandler();
    $("#contact-form-submit").click(function(event) {
      event.preventDefault();
      r = confirm("Under Construction...:(\nCheck Back later ^_^");
      if (r == true) {
          alert("Good Boy!");
      } else {
          // alert("Do I look liek I care?");
          alert("I am sorry!");
          window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      }
    });

});
