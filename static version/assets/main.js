$(document).ready(function() {
  console.log('works');
});

//randomize position for selected works within middle 90% of total screen size
(function ($)
{
  $.fn.randomizePosition = function(rdmitem) {
    //y range
    var y_height = $(this).outerHeight(),
      y_max = (($(window).height() * .95) - y_height),
      y_min = ($(window).height() * .05);

    //y dist
    var randomized_top = getRandomFloat(y_min, y_max);

    //x range
    var x_width = $(this).outerWidth(),
      x_max = (($(window).width() * .95) - x_width),
      x_min = ($(window).width() * .05);

    //y dist
    var randomized_left = getRandomFloat(x_min, x_max);

    //set left and top
    $(this).offset({
      top: randomized_top,
      left: randomized_left
    });
  };
}(jQuery));

//detect offscreen elements
jQuery.expr.filters.offscreen = function(el) {
  var rect = el.getBoundingClientRect();
  return (
           (rect.x + rect.width) < 0
             || (rect.y + rect.height) < 0
             || (rect.x > window.innerWidth || rect.y > window.innerHeight)
         );
};

// open content section on button click
$('.main-toggle').on('click', function() {
  var target = $(this).attr('rel');
  $("#" + target + "-wrap").toggleClass('section-open');

  if ($(this).hasClass('toggle-active')) {
    $(this).removeClass('toggle-active');

    /* remove inline css top on close */
    if (target == 'archive') {
      $('#archive-wrap').css('top', '');
    }
  } else {
    $(this).addClass('toggle-active');

    /* randomize image pos on opening gallery */
    if (target == 'gallery') {
      $('.image').removeClass('image-closed');
        $('.make-drag').each(function() {
          $(this).randomizePosition();
        });
    }

    /* convert the 60vh from top to px */
    if (target == 'archive') {
      var arch_height = $('#archive-wrap').outerHeight(),
        win_height = $(window).height(),
        final_height = (win_height - (arch_height*(2/3)));
        console.log(final_height);
      $('#archive-wrap').css('top', final_height);
    }

  }
});

// fix text-wrap if archive is open
$(document).click(function(event){
  if ($('#archive-wrap').hasClass('section-open')) {
    $('#text-wrap').addClass('archive-is-open');
  } else {
    $('#text-wrap').removeClass('archive-is-open');
  }
});

// remove active status from toggle if archive is closed
// close image when x'd out
// reset selected when all are closed
$('.close').click(function(event) {
  $(this).parent('#archive-wrap').css('top', '');
  $(this).parent('#archive-wrap').toggleClass('section-open');
  var relation = $(this).attr('rel');
  // if this is the archive close then remove the toggle active from the archive button
  if (relation == "archiveclose") {
    $("button[rel^='archive']").removeClass('toggle-active');
  }

  $(this).parent('.image').addClass('image-closed');
  if ( $('.image').length == $('.image-closed').length) {
    $('#gallery-wrap').removeClass('section-open');
    $("button[rel^='gallery']").removeClass('toggle-active');
      $(this).addClass('toggle-active');
  }
});

// integer limiter
function valBetween(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
}

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// trigger randomizer on load
$(document).ready(function() {
  $('.make-drag').each(function() {
    $(this).randomizePosition();
  });
});

// drag function
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
        //constrain dragable to page
        var top_dist = e.pageY + pos_y - drg_h,
          max_y = $(window).height() - $drag.outerHeight(),
          min_y = 0,
          const_pos_y = valBetween( top_dist, min_y, max_y),

          left_dist = e.pageX + pos_x - drg_w,
          max_x = $(window).width() - $drag.outerWidth(),
          min_x = 0,
          const_pos_x = valBetween( left_dist, min_x, max_x);

        $('.draggable').offset(
        {
          top: const_pos_y,
          left: const_pos_x
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

// if object has the class "make-drag", make it draggable
$(document).ready(function() {
      $('.make-drag').drags();
});

// timer used to detect when resize is finished
var resizeTimer;

$(window).resize(function(event) {
  $('.image').each(function() {
    // detect if it's touching the right side
    var rt_offset = ($(window).width() - ($(this).offset().left + $(this).outerWidth()));
    // if it is set right to zero & nix left
    if (rt_offset <= 0) {
      $(this).css({
       'left' : 'initial',
       'right' : '0'
      });
    }

    // detect if it's touching the bottom
    var bt_offset = ($(window).height() - ($(this).offset().top + $(this).outerHeight()));
    // if it is set bottom to zero & nix top
    if (bt_offset <= 0) {
      $(this).css({
       'top' : 'initial',
       'bottom' : '0'
      });
    }
  });

  // once resizing is over unset right, bottom and reset left, top to current position
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    $('.image').each(function() {
      var lf_offset = $(this).offset().left, //get dist from left
        tp_offset = $(this).offset().top; //get dist from top

      $(this).css({
       'left' : lf_offset,
       'right' : 'initial',
       'top' : tp_offset,
       'bottom' : 'initial'
      });
    });
  }, 10);

});

// dragable jquery https://codepen.io/SusanneLundblad/pres/vNOWqK
// integer limiter http://www.hnldesign.nl/work/code/javascript-limit-integer-min-max/
// random floating point within range https://gist.github.com/kerimdzhanov/7529623
// run after resize is finished https://css-tricks.com/snippets/jquery/done-resizing-event/
