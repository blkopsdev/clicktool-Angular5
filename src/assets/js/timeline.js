$(document).ready(function(){
  var dragging = false;
  var spinning = true;
  var degree = 0;
  var start_x;
  var last_mouse;
  var right = 100;
  var position = 1;
  var box_position = 110;
  var box_start = -309;
  var box_start_two = box_start + 700;
  var clicked = false;
  var finished = false;
  var start_time = 0;
  var now_time = 0;
  var first_click = true;


  // Move the 2 Yellowbox images to their starting positions
  $('.yellowbox').css({"right":-309+'%'});
  $('.yellowbox2').css({"right":391+'%'});


  // Rotate the big gear at the bottom
  function milestoneGear(deg, sec) {
    $(".milestone-gear").animate(
      {rotation: deg},
      {
        duration: sec,
        easing: 'linear',
        step: function(now, fx) {
          $(this).css({"transform": "rotate(" + now + "deg)"});
          $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
          $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
          $(this).css('-o-transform', 'rotate(' + now + 'deg)');
          $(this).css('-ms-transform', 'rotate(' + now + 'deg)');
        }
      },
    );
  }

  // Rotate the small gears in the conveyor belt
  function smallMilestoneGear(deg, sec) {
    $(".small-gear").animate(
      {rotation: deg},
      {
        duration: sec,
        easing: 'linear',
        step: function(now, fx) {
          $(this).css({"transform": "rotate(" + now + "deg)"});
          $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
          $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
          $(this).css('-o-transform', 'rotate(' + now + 'deg)');
          $(this).css('-ms-transform', 'rotate(' + now + 'deg)');
          degree = now;
        }
      }
    );
  }

  // Move the first yellowbox image
  function firstYellowbox(dist, sec) {
    $(".yellowbox").animate(
      {right: dist+'%'},
      {
        duration: sec,
        easing: 'linear',
        step: function(now, fx) {
          $(this).css({'right': + now + '%)'});
          box_start = now;
        }
      }
    );
  }

  // Move the second yellowbox image
  function secondYellowbox(dist, sec) {
    $(".yellowbox2").animate(
      {right: dist+'%'},
      {
        duration: sec,
        easing: 'linear',
        step: function(now, fx) {
          $(this).css({'right': + now + '%)'});
          box_start_two = now;
        }
      }
    );
  }

  // End current animations
  function endAnimations() {
    $(".milestone-gear").clearQueue();
    $(".small-gear").clearQueue();
    $(".yellowbox").clearQueue();
    $(".yellowbox2").clearQueue();
  }

  // Animate the gears and yellow boxes
  function spin() {

    milestoneGear(degree, 1000);
    smallMilestoneGear(degree, 1000);

    firstYellowbox(box_start, 1000);
    secondYellowbox(box_start_two, 1000);

    milestoneGear(degree, 1000);
    smallMilestoneGear(degree, 1000);
    degree += 45;

    $(".yellowbox").animate(
      {right: box_start+'%'},
      {
        duration: 1000,
        easing: 'linear',
        step: function(now, fx) {
          $(this).css({'right': + now + '%)'});
        }
      }
    );
    $(".yellowbox2").animate(
      {right: box_start_two+'%'},
      {
        duration: 1000,
        easing: 'linear',
        step: function(now, fx) {
          $(this).css({'right': + now + '%)'});
        }
      }
    );

    // If the yellowbox image goes offscreen, then move it back to the beginning
    if (box_start < -870) {
      box_start = 391;
        $(".yellowbox").animate(
        {right: 391+'%'},
        {
          duration: .0001,
          easing: 'linear',
          step: function(now, fx) {
            $(this).css({'right': + now + '%)'});
          }
        }
      );
    }
    box_start -= 139.5;

    if (box_start_two < -870) {
      box_start_two = 391;
        $(".yellowbox2").animate(
        {right: 391+'%'},
        {
          duration: .0001,
          easing: 'linear',
          step: function(now, fx) {
            $(this).css({'right': + now + '%)'});
          }
        }
      );
    }
    box_start_two -= 139.5;

    // Call the animation again
    if(spinning === true) {
      spin();
    }
  }

  // Stop the animation when the mouse enters the big gear at the bottom
  $('.directions-lg, .instructions').mouseenter(function() {
    spinning = false;
    endAnimations();
  });

  // Get the time and mouse X position when the big gear is clicked
  $('.directions-lg, .instructions').mousedown(function() {
    endAnimations();
    start_x = event.pageX;
    last_mouse = start_x;
    start_time = now_time;
    now_time = new Date().getTime();
    if (degree === 0 || degree % 45 === 0){
      dragging = true;
      finished = true;
    }
  });

  // Restart the animation after 1.2s when the mouse leaves the big gear
  $('.directions-lg, .instructions').mouseleave(function(){
    endAnimations();
    setTimeout(function(){
      first_click = true;
      spinning = true;
      spin();
    }, 1200);
  });

  // Stop the click and drag interactivity when the mouse is not being pressed
  $(document).mouseup(function() {
    dragging = false;
    finished = false;
  });

  // Click and drag interactivity
  $(document).mousemove(function(e) {
    // Only allow another move after the previous animation has finished and mouse is pressed down
    if (dragging && now_time > start_time + 550) {
      endAnimations();
      var mouse_x = e.pageX;
      var mouse_y = e.pageY;

      if (e.pageX > last_mouse + 20 && finished) {

        finished = false;

        milestoneGear((degree+45), 500);
        smallMilestoneGear((degree+45), 500);

        if (box_start < -1000) {
          box_start = 391;
          firstYellowbox(391, .0001);
        }

        if (box_start_two < -1000) {
          box_start_two = 391;
          secondYellowbox(391, .0001);
        }

        firstYellowbox((box_start-139.5), 500);
        secondYellowbox((box_start_two-139.5), 500);

        setTimeout(function() {
          finished = true;
        }, 500);

      } else if (e.pageX < last_mouse - 20 && finished) {

        finished = false;

        milestoneGear((degree-45), 500);
        smallMilestoneGear((degree-45), 500);

        if (box_start > 380) {
          firstYellowbox(-1009, .0001);
        }

        if (box_start_two > 380) {
          secondYellowbox(-1009, .0001);
        }

        firstYellowbox((box_start+139.5), 500);
        secondYellowbox((box_start_two+139.5), 500);

        setTimeout(function() {
          finished = true;
        }, 500);
      }
      last_mouse = e.pageX;
    }
  });

  // Mobile arrow click
  $('.right-mobile').mousedown(function(){
    spinning = false;
    endAnimations();

    finished = false;

    if (!first_click) {
      milestoneGear((degree+45), 500);
      smallMilestoneGear((degree+45), 500);

      if (box_start < -1000) {
        box_start = 391;
        firstYellowbox(391, .0001);
      }

      if (box_start_two < -1000) {
        box_start_two = 391;
        secondYellowbox(391, .0001);
      }

      firstYellowbox((box_start-139.5), 500);
      secondYellowbox((box_start_two-139.5), 500);

      setTimeout(function() {
        finished = true;
      }, 500);
    }
    first_click = false;
  });

  // Mobile arrow click
  $('.left-mobile').mousedown(function() {
    spinning = false;
    endAnimations();

    finished = false;

    if (!first_click) {
      milestoneGear((degree-45), 500);
      smallMilestoneGear((degree-45), 500);

      if (box_start > 380) {
        firstYellowbox(-1009, .0001);
      }

      if (box_start_two > 380) {
        secondYellowbox(-1009, .0001);
      }

      firstYellowbox((box_start+139.5), 500);
      secondYellowbox((box_start_two+139.5), 500);

      setTimeout(function() {
        finished = true;
      }, 500);
    }
    first_click = false;
  });

  if (spinning) {
    spin();
  }

});
