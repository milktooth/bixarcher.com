/*Dragable*/
(function($)
{
  var counter = 0;
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
      $drag.css('z-index', 999999).parents().on("mousemove", function(e)
      {
        $('.draggable').offset(
        {
          top: e.pageY + pos_y - drg_h,
          left: e.pageX + pos_x - drg_w
        }).on("mouseup", function()
        {
          counter++;
          $(this).removeClass('draggable').css('z-index', z_idx);
          $(this).css('z-index', counter);
        });
      });
      e.preventDefault(); // disable selection
    }).on("mouseup", function()
    {
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

/*image closer*/
$(".image-close").click(function()
{
  $(this).parent().toggle();
});

/*archive closer*/
$(".archive-close").click(function()
{
  $(this).parent().toggle();
});

/*reset image desplay state*/
$('#selected-toggle').on('click', function()
{
  $(".image").css(
  {
    display: "flex"
  });
});

$('#archive-toggle').on('click', function()
{
  $(".archive-list").css(
  {
    display: "flex"
  });
});
/*counter for image gallery items*/
$(document).ready(function()
{
  var counter2 = 0;

  var numItems = $('.image').length;

  $('.image-close').click(function()
  {
    counter2++;
    if (counter2 == numItems)
    {
      counter2 = 0;
      $("#image-gallery").toggle();
    }
  });

  $('a').on('click', function()
  {
    counter2 = 0;
  })
});

/*counter for archive items*/
$(document).ready(function()
{
  var counter2 = 0;

  var numItems = $('.archive-list').length;

  $('.archive-close').click(function()
  {
    counter2++;
    if (counter2 == numItems)
    {
      $("#archive").toggle();
      counter2 = 0;
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

/*open modal*/
$('a').on('click', function()
{
  var target = $(this).attr('rel');
  $("#" + target).toggle();
});

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
    }

    else {
      $('.make-drag').off();
      $('.make-drag').removeAttr('style');
      $('#gallery').show();
      $('#archive').show();
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
