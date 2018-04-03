import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Util } from '../shared/util/util'

declare var $:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [Util],
  host: {'(window:scroll)': 'track($event)'},
})
export class HomepageComponent implements OnInit, OnDestroy {

  scrollP:string = "vdvfbfdbf"   


  constructor(private u:Util) { 

  }

  ngOnDestroy() {
    this.u.deleteLocalObject("user")
  }


  // On Scroll event
  onScroll(this:any) {
      //console.log(typeof this.scrollP);

  }

  ngOnInit() {


    // Scoll implemenation  
    //window.addEventListener('scroll', this.onScroll(this), true )

    // Dynamic Headline - https://css-tricks.com/snippets/css/typewriter-effect/
    var TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = 90;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      var that = this;
      var delta = 90;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = 90;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 90;
      }

      setTimeout(function() {
        that.tick();
      }, delta);
    };

    window.onload = function() {
      var elements = document.getElementsByClassName('typewrite');
      for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
      document.body.appendChild(css);
    };
    // New Countdown Timer

    // Set the date we're counting down to
    var countDownDate = new Date("Jul 1, 2018 12:00:00").getTime();
    var secondsDegree = 0;
    var minutesDegree = 15;

    //window.addEventListener('blur', x); TODO fix it

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      secondsDegree += 30;
      minutesDegree -= 30;

      // Display the result in the element with id="demo"
     // document.getElementById("days").innerHTML = String(days);
      // document.getElementById("hours").innerHTML = String(hours);
      // document.getElementById("minutes").innerHTML = String(minutes);
      // document.getElementById("seconds").innerHTML = String(seconds);

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);

    $(document).ready(function(){
    // Scrolling Wrench -------------------
      $(window).scroll(function() {
        console.log('test');
        var offset = $(window).scrollTop();
        offset     = 75 + (offset * 0.2);

        $('.wrench').css({
          '-moz-transform': 'rotate(' + offset + 'deg)',
          '-webkit-transform': 'rotate(' + offset + 'deg)',
          '-o-transform': 'rotate(' + offset + 'deg)',
          '-ms-transform': 'rotate(' + offset + 'deg)',
          'transform': 'rotate(' + offset + 'deg)',
        });

        $('#yellow-gear').css({
          '-moz-transform': 'rotate(' + offset + 'deg)',
          '-webkit-transform': 'rotate(' + offset + 'deg)',
          '-o-transform': 'rotate(' + offset + 'deg)',
          '-ms-transform': 'rotate(' + offset + 'deg)',
          'transform': 'rotate(' + offset + 'deg)',
        });

        offset = 360 - offset;
        $('.multigray-circle').css({
          '-moz-transform': 'rotate(' + offset + 'deg)',
          '-webkit-transform': 'rotate(' + offset + 'deg)',
          '-o-transform': 'rotate(' + offset + 'deg)',
          '-ms-transform': 'rotate(' + offset + 'deg)',
          'transform': 'rotate(' + offset + 'deg)',
        });

        $('#pink-gear').css({
          '-moz-transform': 'rotate(' + offset + 'deg)',
          '-webkit-transform': 'rotate(' + offset + 'deg)',
          '-o-transform': 'rotate(' + offset + 'deg)',
          '-ms-transform': 'rotate(' + offset + 'deg)',
          'transform': 'rotate(' + offset + 'deg)',
        });
        });
      });

    } // End ngOnInit

}








    //   // Video Modal -------------------

    //   $('.launch-modal').on('click', function(e){
    //     e.preventDefault();
    //     $( '#' + $(this).data('modal-id') ).modal();
    //     if ($( $(this).data('modal-id')).modal().selector == 'modal-video1') {

    //       //  document.getElementById('video-frame1').play(); TODO fix it

    //     } else if ($( $(this).data('modal-id')).modal().selector == 'modal-video2') {
    //       // document.getElementById('video-frame2').play(); TODO fix it
    //     }
    //   });
    //   $(".modal-video-div").on("hidden.bs.modal", function () {
    //     // document.getElementById('video-frame1').pause(); TODO fix it
    //     // document.getElementById('video-frame2').pause(); TODO fix it
    //   });


    //   // Timeline -------------------

    //   var dragging = false;
    //   var spinning = true;
    //   var degree = 0;
    //   var start_x;
    //   var last_mouse;
    //   var right = 100;
    //   var position = 1;
    //   var box_position = 110;
    //   var box_start = -309;
    //   var box_start_two = box_start + 700;
    //   var clicked = false;
    //   var finished = false;
    //   var start_time = 0;
    //   var now_time = 0;
    //   var first_click = true;


    //   // Move the 2 Yellowbox images to their starting positions
    //   $('.yellowbox').css({"right":-309+'%'});
    //   $('.yellowbox2').css({"right":391+'%'});


    //   // Rotate the big gear at the bottom
    //   function milestoneGear(deg, sec) {
    //     $(".milestone-gear").animate(
    //       {rotation: deg},
    //       {
    //         duration: sec,
    //         easing: 'linear',
    //         step: function(now, fx) {
    //           $(this).css({"transform": "rotate(" + now + "deg)"});
    //           $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-o-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-ms-transform', 'rotate(' + now + 'deg)');
    //         }
    //       }
    //     );
    //   }

    //   // Rotate the small gears in the conveyor belt
    //   function smallMilestoneGear(deg, sec) {
    //     $(".small-gear").animate(
    //       {rotation: deg},
    //       {
    //         duration: sec,
    //         easing: 'linear',
    //         step: function(now, fx) {
    //           $(this).css({"transform": "rotate(" + now + "deg)"});
    //           $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-o-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-ms-transform', 'rotate(' + now + 'deg)');
    //           degree = now;
    //         }
    //       }
    //     );
    //   }

    //   // Move the first yellowbox image
    //   function firstYellowbox(dist, sec) {
    //     $(".yellowbox").animate(
    //       {right: dist+'%'},
    //       {
    //         duration: sec,
    //         easing: 'linear',
    //         step: function(now, fx) {
    //           $(this).css({'right': + now + '%)'});
    //           box_start = now;
    //         }
    //       }
    //     );
    //   }

    //   // Move the second yellowbox image
    //   function secondYellowbox(dist, sec) {
    //     $(".yellowbox2").animate(
    //       {right: dist+'%'},
    //       {
    //         duration: sec,
    //         easing: 'linear',
    //         step: function(now, fx) {
    //           $(this).css({'right': + now + '%)'});
    //           box_start_two = now;
    //         }
    //       }
    //     );
    //   }

    //   // End current animations
    //   function endAnimations() {
    //     $(".milestone-gear").clearQueue();
    //     $(".small-gear").clearQueue();
    //     $(".yellowbox").clearQueue();
    //     $(".yellowbox2").clearQueue();
    //   }

    //   // Animate the gears and yellow boxes
    //   function spin() {

    //     milestoneGear(degree, 1000);
    //     smallMilestoneGear(degree, 1000);

    //     firstYellowbox(box_start, 1000);
    //     secondYellowbox(box_start_two, 1000);

    //     milestoneGear(degree, 1000);
    //     smallMilestoneGear(degree, 1000);
    //     degree += 45;

    //     $(".yellowbox").animate(
    //       {right: box_start+'%'},
    //       {
    //         duration: 1000,
    //         easing: 'linear',
    //         step: function(now, fx) {
    //           $(this).css({'right': + now + '%)'});
    //         }
    //       }
    //     );
    //     $(".yellowbox2").animate(
    //       {right: box_start_two+'%'},
    //       {
    //         duration: 1000,
    //         easing: 'linear',
    //         step: function(now, fx) {
    //           $(this).css({'right': + now + '%)'});
    //         }
    //       }
    //     );

    //     // If the yellowbox image goes offscreen, then move it back to the beginning
    //     if (box_start < -870) {
    //       box_start = 391;
    //         $(".yellowbox").animate(
    //         {right: 391+'%'},
    //         {
    //           duration: .0001,
    //           easing: 'linear',
    //           step: function(now, fx) {
    //             $(this).css({'right': + now + '%)'});
    //           }
    //         }
    //       );
    //     }
    //     box_start -= 139.5;

    //     if (box_start_two < -870) {
    //       box_start_two = 391;
    //         $(".yellowbox2").animate(
    //         {right: 391+'%'},
    //         {
    //           duration: .0001,
    //           easing: 'linear',
    //           step: function(now, fx) {
    //             $(this).css({'right': + now + '%)'});
    //           }
    //         }
    //       );
    //     }
    //     box_start_two -= 139.5;

    //     // Call the animation again
    //     if(spinning === true) {
    //       spin();
    //     }
    //   }

    //   // Stop the animation when the mouse enters the big gear at the bottom
    //   $('.directions-lg, .instructions').mouseenter(function() {
    //     spinning = false;
    //     endAnimations();
    //   });

    //   // Get the time and mouse X position when the big gear is clicked
    //   $('.directions-lg, .instructions').mousedown(function(event) {
    //     endAnimations();

    //     start_x = event.pageX;

    //     last_mouse = start_x;
    //     start_time = now_time;
    //     now_time = new Date().getTime();
    //     if (degree === 0 || degree % 45 === 0){
    //       dragging = true;
    //       finished = true;
    //     }
    //   });

    //   // Restart the animation after 1.2s when the mouse leaves the big gear
    //   $('.directions-lg, .instructions').mouseleave(function(){
    //     endAnimations();
    //     setTimeout(function(){
    //       first_click = true;
    //       spinning = true;
    //       spin();
    //     }, 1200);
    //   });

    //   // Stop the click and drag interactivity when the mouse is not being pressed
    //   $(document).mouseup(function() {
    //     dragging = false;
    //     finished = false;
    //   });

    //   // Click and drag interactivity
    //   $(document).mousemove(function(e) {
    //     // Only allow another move after the previous animation has finished and mouse is pressed down
    //     if (dragging && now_time > start_time + 550) {
    //       endAnimations();
    //       var mouse_x = e.pageX;
    //       var mouse_y = e.pageY;

    //       if (e.pageX > last_mouse + 20 && finished) {

    //         finished = false;

    //         milestoneGear((degree+45), 500);
    //         smallMilestoneGear((degree+45), 500);

    //         if (box_start < -1000) {
    //           box_start = 391;
    //           firstYellowbox(391, .0001);
    //         }

    //         if (box_start_two < -1000) {
    //           box_start_two = 391;
    //           secondYellowbox(391, .0001);
    //         }

    //         firstYellowbox((box_start-139.5), 500);
    //         secondYellowbox((box_start_two-139.5), 500);

    //         setTimeout(function() {
    //           finished = true;
    //         }, 500);

    //       } else if (e.pageX < last_mouse - 20 && finished) {

    //         finished = false;

    //         milestoneGear((degree-45), 500);
    //         smallMilestoneGear((degree-45), 500);

    //         if (box_start > 380) {
    //           firstYellowbox(-1009, .0001);
    //         }

    //         if (box_start_two > 380) {
    //           secondYellowbox(-1009, .0001);
    //         }

    //         firstYellowbox((box_start+139.5), 500);
    //         secondYellowbox((box_start_two+139.5), 500);

    //         setTimeout(function() {
    //           finished = true;
    //         }, 500);
    //       }
    //       last_mouse = e.pageX;
    //     }
    //   });

    //   // Mobile arrow click
    //   $('.right-mobile').mousedown(function(){
    //     spinning = false;
    //     endAnimations();

    //     finished = false;

    //     if (!first_click) {
    //       milestoneGear((degree+45), 500);
    //       smallMilestoneGear((degree+45), 500);

    //       if (box_start < -1000) {
    //         box_start = 391;
    //         firstYellowbox(391, .0001);
    //       }

    //       if (box_start_two < -1000) {
    //         box_start_two = 391;
    //         secondYellowbox(391, .0001);
    //       }

    //       firstYellowbox((box_start-139.5), 500);
    //       secondYellowbox((box_start_two-139.5), 500);

    //       setTimeout(function() {
    //         finished = true;
    //       }, 500);
    //     }
    //     first_click = false;
    //   });

    //   // Mobile arrow click
    //   $('.left-mobile').mousedown(function() {
    //     spinning = false;
    //     endAnimations();

    //     finished = false;

    //     if (!first_click) {
    //       milestoneGear((degree-45), 500);
    //       smallMilestoneGear((degree-45), 500);

    //       if (box_start > 380) {
    //         firstYellowbox(-1009, .0001);
    //       }

    //       if (box_start_two > 380) {
    //         secondYellowbox(-1009, .0001);
    //       }

    //       firstYellowbox((box_start+139.5), 500);
    //       secondYellowbox((box_start_two+139.5), 500);

    //       setTimeout(function() {
    //         finished = true;
    //       }, 500);
    //     }
    //     first_click = false;
    //   });

    //   if (spinning) {
    //     spin();
    //   }

    //   // Gear Charts
    //   function chartGearSpin(item){
    //     $(item).stop(true);
    //     $(item).animate(
    //       {rotation: 180},
    //       {
    //         duration: 500,
    //         easing: 'swing',
    //         step: function(now, fx) {
    //           $(this).css({"transform": "rotate(" + now + "deg)"});
    //           $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-o-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-ms-transform', 'rotate(' + now + 'deg)');
    //         }
    //       }
    //     );
    //     $(item).animate(
    //       {rotation: 0},
    //       {
    //         duration: .0001,
    //         easing: 'linear',
    //         step: function(now, fx) {
    //           $(this).css({"transform": "rotate(" + now + "deg)"});
    //           $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-o-transform', 'rotate(' + now + 'deg)');
    //           $(this).css('-ms-transform', 'rotate(' + now + 'deg)');
    //         }
    //       }
    //     );
    //   }

    //   // Bind Legend and Gears

    //   $('.chart-gear').mouseenter(function(){
    //     chartGearSpin(this);
    //   });

    //   $('#chart1b').mouseenter(function(){
    //     $('#marketing').addClass('chart-active chart-active1a');
    //   });

    //   $('.chart-text1a').mouseenter(function(){
    //     $('#marketing').addClass('chart-active chart-active1a');
    //   });

    //   $('#chart1b').mouseleave(function(){
    //     $('#marketing').removeClass('chart-active chart-active1a');
    //   });

    //   $('.chart-text1a').mouseleave(function(){
    //     $('#marketing').removeClass('chart-active chart-active1a');
    //   });

    //   $('#marketing').mouseenter(function(){
    //     chartGearSpin('#chart1b');
    //   });

    //   $('#chart1a').mouseenter(function(){
    //     $('#development').addClass('chart-active chart-active2a');
    //   });

    //   $('.chart-text1b').mouseenter(function(){
    //     $('#development').addClass('chart-active chart-active2a');
    //   });

    //   $('#chart1a').mouseleave(function(){
    //     $('#development').removeClass('chart-active chart-active2a');
    //   });

    //   $('.chart-text1b').mouseleave(function(){
    //     $('#development').removeClass('chart-active chart-active2a');
    //   });

    //   $('#development').mouseenter(function(){
    //     chartGearSpin('#chart1a');
    //   });

    //   $('#chart1c').mouseenter(function(){
    //     $('#acquisition').addClass('chart-active chart-active3a');
    //   });

    //   $('.chart-text1c').mouseenter(function(){
    //     $('#acquisition').addClass('chart-active chart-active3a');
    //   });

    //   $('#chart1c').mouseleave(function(){
    //     $('#acquisition').removeClass('chart-active chart-active3a');
    //   });

    //   $('.chart-text1c').mouseleave(function(){
    //     $('#acquisition').removeClass('chart-active chart-active3a');
    //   });

    //   $('#acquisition').mouseenter(function(){
    //     chartGearSpin('#chart1c');
    //   });

    //   $('#chart1d').mouseenter(function(){
    //     $('#legal').addClass('chart-active chart-active4a');
    //   });

    //   $('.chart-text1d').mouseenter(function(){
    //     $('#legal').addClass('chart-active chart-active4a');
    //   });

    //   $('#chart1d').mouseleave(function(){
    //     $('#legal').removeClass('chart-active chart-active4a');
    //   });

    //   $('.chart-text1d').mouseleave(function(){
    //     $('#legal').removeClass('chart-active chart-active4a');
    //   });

    //   $('#legal').mouseenter(function(){
    //     chartGearSpin('#chart1d');
    //   });

    //   $('#chart2a').mouseenter(function(){
    //     $('#ico').addClass('chart-active chart-active1b');
    //   });

    //   $('.chart-text2a').mouseenter(function(){
    //     $('#ico').addClass('chart-active chart-active1b');
    //   });

    //   $('#chart2a').mouseleave(function(){
    //     $('#ico').removeClass('chart-active chart-active1b');
    //   });

    //   $('.chart-text2a').mouseleave(function(){
    //     $('#ico').removeClass('chart-active chart-active1b');
    //   });

    //   $('#ico').mouseenter(function(){
    //     chartGearSpin('#chart2a');
    //   });

    //   $('#chart2c').mouseenter(function(){
    //     $('#liquidity').addClass('chart-active chart-active2b');
    //   });

    //   $('.chart-text2b').mouseenter(function(){
    //     $('#liquidity').addClass('chart-active chart-active2b');
    //   });

    //   $('#chart2c').mouseleave(function(){
    //     $('#liquidity').removeClass('chart-active chart-active2b');
    //   });

    //   $('.chart-text2b').mouseleave(function(){
    //     $('#liquidity').removeClass('chart-active chart-active2b');
    //   });

    //   $('#liquidity').mouseenter(function(){
    //     chartGearSpin('#chart2c');
    //   });

    //   $('#chart2b').mouseenter(function(){
    //     $('#distribution').addClass('chart-active chart-active3b');
    //   });

    //   $('.chart-text2c').mouseenter(function(){
    //     $('#distribution').addClass('chart-active chart-active3b');
    //   });

    //   $('#chart2b').mouseleave(function(){
    //     $('#distribution').removeClass('chart-active chart-active3b');
    //   });

    //   $('.chart-text2c').mouseleave(function(){
    //     $('#distribution').removeClass('chart-active chart-active3b');
    //   });

    //   $('#distribution').mouseenter(function(){
    //     chartGearSpin('#chart2b');
    //   });

    //   $('#chart2d').mouseenter(function(){
    //     $('#presale').addClass('chart-active chart-active4b');
    //   });

    //   $('.chart-text2d').mouseenter(function(){
    //     $('#presale').addClass('chart-active chart-active4b');
    //   });

    //   $('#chart2d').mouseleave(function(){
    //     $('#presale').removeClass('chart-active chart-active4b');
    //   });

    //   $('.chart-text2d').mouseleave(function(){
    //     $('#presale').removeClass('chart-active chart-active4b');
    //   });

    //   $('#presale').mouseenter(function(){
    //     chartGearSpin('#chart2d');
    //   });

    //   $('#chart2e').mouseenter(function(){
    //     $('#community').addClass('chart-active chart-active5');
    //   });

    //   $('.chart-text2e').mouseenter(function(){
    //     $('#community').addClass('chart-active chart-active5');
    //   });

    //   $('#chart2e').mouseleave(function(){
    //     $('#community').removeClass('chart-active chart-active5');
    //   });

    //   $('.chart-text2e').mouseleave(function(){
    //     $('#community').removeClass('chart-active chart-active5');
    //   });

    //   $('#community').mouseenter(function(){
    //     chartGearSpin('#chart2e');
    //   });

    // });






