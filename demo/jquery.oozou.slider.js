/* ===========================================================
 * jquery.oozou.slider.js v1
 * ===========================================================
 * A very simple and light weight jQuery plugin that 
 * allows you to rotate multiple text without changing 
 * the layout
 *
 * https://github.com/oozou/slider
 *
 * ========================================================== */

!function($){
  
  var defaults = {
		direction: "horizontal",
		loop: true,
		pagination: true,
		parallax: true,
		autoplay: false
	};
	
	function Timer(callback, delay) {
      var timerId, start, remaining = delay;

      this.pause = function() {
          window.clearTimeout(timerId);
          remaining -= new Date() - start;
      };

      this.resume = function() {
          start = new Date();
          timerId = window.setTimeout(callback, remaining);
      };

      this.resume();
  }
	
	
  $.fn.slider = function(options){
    var settings = $.extend({}, defaults, options);
    
    $.fn.moveTo = function(nextIndex) {
      var el3 = $(this)
      var direction = "next"
      var total = el3.find(".os-slide").length - 1
      if (el3.attr("data-current") > nextIndex) var direction = "prev"
      
      
      
      if (!el3.hasClass("os-animating")) {
        if (direction == "prev") {
          var next = el3.find(".os-slide[data-index='" + el3.attr("data-current") + "']")
          var current = el3.find(".os-slide[data-index='" + nextIndex + "']")
        } else {
          var current = el3.find(".os-slide[data-index='" + el3.attr("data-current") + "']")
          var next = el3.find(".os-slide[data-index='" + nextIndex + "']")
        }
        var extra = "",
            looping = false;
        
        if (settings.loop == true) {
          if (direction == "next" && total == el3.attr("data-current")) {
            var next = el3.find(".os-slide[data-index='0']")
            nextIndex = 0;
            looping = true;
          }
          if (direction == "prev" && el3.attr("data-current") == 0) {
            var current = el3.find(".os-slide[data-index='" + total + "']")
            nextIndex = total;
            looping = true;
          }
        }
        
        if (next.length > 0 && current.length > 0) {
          
          
          el3.find(".os-pagination > .os-page > a").removeClass("active")

          el3.find(".os-pagination > .os-page > a[data-nextindex='" + nextIndex + "']").addClass("active")
          
          el3.addClass("os-animating")
          var top = current.clone().show().wrap($('<div class="os-top-wrapper"/>')).parent()
          var bottom = current.clone().show().wrap($('<div class="os-bottom-wrapper"/>')).parent()
          
          if (direction == "next") {
            extra = "os-inview"
          }
          top.addClass( extra + " os-top-animate")
          if (el3.hasClass("os-vertical")) {
            
            top.find(".os-slide").css("width", current.width())
            bottom.addClass( extra + " os-bottom-animate").find(".os-slide").css("width", current.width()).css("margin-left", (current.width() / 2) * -1)
          } else {
            bottom.addClass( extra + " os-bottom-animate").find(".os-slide").css("margin-top", (current.height() / 2) * -1)
          }
          el3.append(top)
          el3.append(bottom)
          
          var hidden  = new Timer(function() {
            if (direction == "prev") {
              if (looping == false) current.show()
            } else {
              current.hide()
              next.show()
            }
            
          }, 50);
          
          var timeout_open = new Timer(function() {
            if (direction == "prev") {
              el3.find(".os-bottom-animate, .os-top-animate").addClass("os-inview")
            } else {
              el3.find(".os-bottom-animate, .os-top-animate").removeClass("os-inview")
            }
             
            el3.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
              el3.find(".os-bottom-animate, .os-top-animate").remove();
              if (direction == "prev") {
                el3.find(".os-slide").removeClass("active").hide()
                current.addClass("active").show()
                if (current.find(".os-content").length > 0) {
                  var timeout_open = new Timer(function() {
                    el3.attr("data-current", current.data("index"))
                    el3.removeClass("os-animating")
                  }, 300);
                } else {
                   var timeout_open = new Timer(function() {
                      el3.attr("data-current", current.data("index"))
                      el3.removeClass("os-animating")
                    }, 300);
                }
                
              } else {
                current.removeClass("active")
                next.addClass("active")
                el3.attr("data-current", next.data("index"))
                el3.removeClass("os-animating")
              }
              
            });
          }, 200);


        }
      }
      
    }
    
    return this.each(function(){
      var el = $(this),
      current_index = 0;
      
       function parallax() {
          var $window = $(window); 

          el.find('.os-slide').each(function(){
            var $bgobj = $(this); 
            $(window).scroll(function() {
              var mult = 4;
              if ($(window).width() < 700) {
                mult = 10;
              }
              var yPos = -($window.scrollTop() / mult);

              var coords = '50% '+ yPos + 'px';

              $bgobj.css({ backgroundPosition: coords });
            });
          });
          el.find(".os-slide").wrapAll("<div class='inner-slider'></div>")
        }
      
      
      if (settings.direction == "vertical") {
        el.addClass("os-vertical")
      }
      el.addClass("os-slider").find(".os-inner > *").each(function(i){
        var el2 = $(this)
        
        
        el2.addClass("os-slide").attr("data-index", i).css({
          "background":"url(" + el2.data("background") + ") 50% 0 no-repeat",
          "background-size": "cover"
        });
       
        if (el2.hasClass("active")) {
          el.attr("data-current", el2.data("index"))
          el.height(el2.height())

          
          current_index = el2.data("index");
        }
      });
      
      if (settings.parallax == true) parallax();
      
      el.find(".os-navigation .os-next").click(function() {
        el.moveTo(parseInt(el.attr("data-current")) + 1)
        return false
      });
      
      el.find(".os-navigation .os-prev").click(function() {
        el.moveTo(parseInt(el.attr("data-current")) - 1)
        return false
      });
      
      el.hover(
          function(){
              el.addClass('os-hover');
          },
          function(){
              el.removeClass('os-hover');
          }
      );
      
      if (settings.pagination == true) {
        el.append("<ul class='os-pagination'></ul>");
        var pagi_content = ""
        el.find(".os-inner .os-slide").each(function(i){
          var extra = ""
          if ($(this).hasClass("active")) extra = "active"
          pagi_content += "<li class='os-page'><a class='" + extra + "' data-nextindex='" + i + "' href='#'>" + (i + 1) + "</a></li>"
        });
        el.find(".os-pagination").html(pagi_content)
        
        
        el.find(".os-pagination > .os-page > a").click(function() {
          var next = $(this).data("nextindex");
          el.moveTo(next);
          return false;
        });
        
        if (settings.autoplay != false) {
          setInterval(function(){
            if(!el.hasClass("os-hover")) {
              el.moveTo(parseInt(el.attr("data-current")) + 1)
            }
          },settings.autoplay);
        }
        
      }
      
    });
  }
  
}(window.jQuery);


