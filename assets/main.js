/*Dragable*/
(function($)
{
  $.fn.drags = function(opt)
  {


    opt = $.extend(
    {
      handle: "",
      cursor: "move"
    }, opt);

    if (opt.handle === "")
    {
      var $el = this;
    }
    else
    {
      var $el = this.find(opt.handle);
    }

    return $el.css('cursor', opt.cursor).on("mousedown", function(e)
    {
      if (opt.handle === "")
      {
        var $drag = $(this).addClass('draggable');
      }
      else
      {
        var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
      }
      var z_idx = $drag.css('z-index'),
        drg_h = $drag.outerHeight(),
        drg_w = $drag.outerWidth(),
        pos_y = $drag.offset().top + drg_h - e.pageY,
        pos_x = $drag.offset().left + drg_w - e.pageX;
      $drag.css('z-index', 8).parents().on("mousemove", function(e)
      {
        $('.draggable').offset(
        {
          top: e.pageY + pos_y - drg_h,
          left: e.pageX + pos_x - drg_w
        }).on("mouseup", function()
        {
        });
      });
      e.preventDefault(); // disable selection
    }).on("mouseup", function()
    {
      $('.make-drag').each(function() {
        var currentZindex = $(this).css('z-index');
        currentZindex = currentZindex - 1;

        $(this).css('z-index', currentZindex);
      });

      $(this).css('z-index', 6);

      if (opt.handle === "")
      {
        $(this).removeClass('draggable');
      }
      else
      {
        $(this).removeClass('active-handle').parent().removeClass('draggable');
      }
    });
  }
})(jQuery);

/*random position within canvas*/

function randomFromTo(from, to)
{
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function moveRandom(obj)
{
  /* get container position and size
   * -- access method : cPos.top and cPos.left */
  var cPos = $('#canvas-size').offset();
  var cHeight = $('#canvas-size').height();
  var cWidth = $('#canvas-size').width();

  // get box padding (assume all padding have same value)
  var pad = parseInt($('#canvas-size').css('padding-top').replace('px', ''));

  // get movable box size
  var bHeight = obj.height();
  var bWidth = obj.width();

  // set maximum position
  maxY = cPos.top + cHeight - bHeight - pad;
  maxX = cPos.left + cWidth - bWidth - pad;

  // set minimum position
  minY = cPos.top + pad;
  minX = cPos.left + pad;

  // set new position
  newY = randomFromTo(minY, maxY);
  newX = randomFromTo(minX, maxX);

  obj.animate(
  {
    top: newY,
    left: newX
  });
}

/*closer*/
$(".close").click(function()
{
  $(this).parent().toggle();
  $(this).parent().toggleClass('closed-item');
});

/*open modal*/
$('a').on('click', function()
{
  var target = $(this).attr('rel');
  $("#" + target).toggle();

  if ( $("#" + target).css('display') == 'block' ) {
    $(this).addClass('opened-modal');
  }

  else {
    $(this).removeClass('opened-modal');
  }

  $("#" + target + " .make-drag").css(
    {
    display: "flex",
  });

  $("#" + target + " .make-drag").css('z-index', '4');

});


$(document).ready(function()
{
  var totalItems = $('.image').length;

  $('.close').click(function()
  {
    var closedItems = $('#gallery .closed-item').length;

    if (totalItems == closedItems)
    {
      $("#gallery").toggle();
      $(".image").toggle();
      $(".image").removeClass('closed-item');
      $('#selected-toggle').toggleClass('opened-modal');
    }
  });
});

$(document).ready(function()
{
  var totalItems = $('.archive-list').length;

  $('.close').click(function()
  {
    var closedItems = $('#archive .closed-item').length;

    if (totalItems == closedItems)
    {
      $("#archive").toggle();
      $(".archive-list").toggle();
      $(".archive-list").removeClass('closed-item');
      $('#archive-toggle').toggleClass('opened-modal');
    }
  });
});

/*detect offscreen items*/
jQuery.expr.filters.offscreen = function(el)
{
  var rect = el.getBoundingClientRect();
  return (
    (rect.x + rect.width) < 0 ||
    (rect.y + rect.height) < 0 ||
    (rect.x > window.innerWidth || rect.y > window.innerHeight)
  );
};

/*randomize positions if items are offscreen after resize with delay*/
var id;
$(window).resize(function()
{
  clearTimeout(id);
  id = setTimeout(doneResizing, 500);
});

function doneResizing()
{
  if ($('.make-drag').is(':offscreen') && $(window).width() > 768)
  {
    $('.make-drag').each(function()
    {
      moveRandom($(this));
    });
  }
}

$(document).ready(function() {
    if ( $(window).width() > 768 ) {
      $('.make-drag').drags();

      /*randomize image postion on open*/
      $('.image').each(function()
      {
        moveRandom($(this));
      });
    }

    else {
      $('.make-drag').off();
      $('.make-drag').removeAttr('style');
      $('#gallery').show();
      $('#archive').show();
    }
});

$(window).resize(function(event) {
    if ( $(window).width() > 768 ) {
      $('.make-drag').drags();
      $('.image').css('display', 'flex');
    }

    else {
      $('.make-drag').off();
      $('.make-drag').removeAttr('style');
      $('#gallery').show();
      $('#archive').show();
    }
});

$(window).resize(function(event) {
    if ( $('#gallery').css('display') == 'block' ) {
      $('#selected-toggle').addClass('opened-modal');
    }

    else {
      $('#selected-toggle').removeClass('opened-modal');
    }
});

$(window).resize(function(event) {
  if ( $('#archive').css('display') == 'block' ) {
    $('#archive-toggle').addClass('opened-modal');
  }

  else {
    $('#archive-toggle').removeClass('opened-modal');
  }
});

/*
  Javascript Credits
  Offscreen detection: https://stackoverflow.com/questions/8897289/how-to-check-if-an-element-is-off-screen#8897628
  Random position: https://stackoverflow.com/questions/20924613/move-multiple-divs-randomly-using-jquery
  Dragable w/out jQuery UI: https://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
  Resize trigger adjustment: http://jsfiddle.net/Zevan/c9UE5/1/
  Brilliantly simple touch device detection: https://codeburst.io/the-only-way-to-detect-touch-with-javascript-7791a3346685
*/
