import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-machine-animation',
  templateUrl: './machine-animation.component.html',
  styleUrls: ['./machine-animation.component.css']
})
export class MachineAnimationComponent implements OnInit {

  dragging = false;
  spinning = true;
  degree = 0;
  start_x;
  mouse_x;
  mouse_y;
  last_mouse;
  right = 100;
  position = 1;
  box_position = 110;
  box_start = -309;
  box_start_two = 391;
  clicked = false;
  finished = false;
  start_time = 0;
  now_time = 0;
  first_click = true;

  interval:any

  constructor() { }

  ngOnInit() {
    this.yellowBoxStart();
    this.startInterval();
    this.stopSpin();
    this.startSpin();
    this.mouseInfo();
    this.mouseUpTimeline();
    this.clickAndDrag();
  }

  // Move the 2 Yellowbox images to their starting positions
  yellowBoxStart() {
    $('.yellowbox').css({"right":-309+'%'});
    $('.yellowbox2').css({"right":391+'%'});
  }

  // Rotate the big gear at the bottom
  milestoneGear(deg, sec) {
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
      }
    );
  }

  // Rotate the small gears in the conveyor belt
  smallMilestoneGear(deg, sec) {
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
          this.degree = now;
        }
      }
    );
  }

  // Move the first yellowbox image
  firstYellowbox(dist, sec) {
    $(".yellowbox").animate(
      {right: dist+'%'},
      {
        duration: sec,
        easing: 'linear',
        step: function(now, fx) {
          $(this).css({'right': + now + '%)'});
          this.box_start = now;
        }
      }
    );
  }

  // Move the second yellowbox image
  secondYellowbox(dist, sec) {
    $(".yellowbox2").animate(
      {right: dist+'%'},
      {
        duration: sec,
        easing: 'linear',
        step: function(now, fx) {
          $(this).css({'right': + now + '%)'});
          this.box_start_two = now;
        }
      }
    );
  }

  // End current animations
  endAnimations() {
    $(".milestone-gear").clearQueue();
    $(".small-gear").clearQueue();
    $(".yellowbox").clearQueue();
    $(".yellowbox2").clearQueue();
  }

    // Animate the gears and yellow boxes
  spin() {

    this.milestoneGear(this.degree, 1000);
    this.smallMilestoneGear(this.degree, 1000);
    console.log(this.degree)

    this.firstYellowbox(this.box_start, 1000);
    this.secondYellowbox(this.box_start_two, 1000);

    this.milestoneGear(this.degree, 1000);
    this.smallMilestoneGear(this.degree, 1000);
    this.degree += 45;

    $(".yellowbox").animate(
      {right: this.box_start+'%'},
      {
        duration: 1000,
        easing: 'linear',
        step: function(now, fx) {
          $(this).css({'right': + now + '%)'});
        }
      }
    );
    $(".yellowbox2").animate(
      {right: this.box_start_two+'%'},
      {
        duration: 1000,
        easing: 'linear',
        step: function(now, fx) {
          $(this).css({'right': + now + '%)'});
        }
      }
    );

    // If the yellowbox image goes offscreen, then move it back to the beginning
    if (this.box_start < -870) {
      this.box_start = 391;
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
    this.box_start -= 139.5;

    if (this.box_start_two < -870) {
      this.box_start_two = 391;
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
    this.box_start_two -= 139.5;
  }

  // Stop the animation when the mouse enters the big gear at the bottom
  stopSpin() {
    $('.directions, .instructions').mouseenter(() => {
      this.spinning = false;
      this.endAnimations()
      clearInterval(this.interval)
      this.endAnimations()
    });
  }

  // Restart the animation after 1.2s when the mouse leaves the big gear
  startSpin() {
    $('.directions').mouseleave(() => {
      this.endAnimations();
      setTimeout(() => {
        this.first_click = true;
        this.spinning = true;
        clearInterval(this.interval)
        this.startInterval()
      }, 1200);
    });
  }

  startInterval() {
    this.interval = setInterval(()=>{
      this.spin()
    }, 2000);
  }

  // Get the time and mouse X position when the big gear is clicked
  mouseInfo() {
    $('.directions, .instructions').mousedown((event) => {
      this.endAnimations();

      this.start_x = event.pageX;

      this.last_mouse = this.start_x;
      this.start_time = this.now_time;
      this.now_time = new Date().getTime();
      if (this.degree === 0 || this.degree % 45 === 0){
        this.dragging = true;
        this.finished = true;
      }
    });
  }

  // Stop the click and drag interactivity when the mouse is not being pressed
  mouseUpTimeline() {
    $(document).mouseup(() => {
      this.dragging = false;
      this.finished = false;
    });
  }

  // Click and drag interactivity
  clickAndDrag() {
    $(document).mousemove((e) => {
      // Only allow another move after the previous animation has finished and mouse is pressed down
      if (this.dragging && this.now_time > this.start_time + 550) {
        this.endAnimations();
        this.mouse_x = e.pageX;
        this.mouse_y = e.pageY;

        if (e.pageX > this.last_mouse + 20 && this.finished) {

          this.finished = false;

          if(!this.first_click){
            this.degree = this.degree + 45
            this.box_start = this.box_start - 139.5
            this.box_start_two = this.box_start_two - 139.5
          }

          this.first_click = false;
          console.log(this.degree)
          this.milestoneGear((this.degree), 500);
          this.smallMilestoneGear((this.degree), 500);

          if (this.box_start < -1000) {
            this.box_start = 391;
            this.firstYellowbox(391, .0001);
          }

          if (this.box_start_two < -1000) {
            this.box_start_two = 391;
            this.secondYellowbox(391, .0001);
          }

          this.firstYellowbox((this.box_start), 500);
          this.secondYellowbox((this.box_start_two), 500);

          setTimeout(() => {
            this.finished = true;
          }, 500);

        } else if (e.pageX < this.last_mouse - 20 && this.finished) {

          this.finished = false;

          if(!this.first_click){
            this.degree = this.degree - 45
            this.box_start = this.box_start + 139.5
            this.box_start_two = this.box_start_two + 139.5
          }

          this.first_click = false;

          this.milestoneGear((this.degree), 500);
          this.smallMilestoneGear((this.degree), 500);

          if (this.box_start > 380) {
            this.firstYellowbox(-1009, .0001);
          }

          if (this.box_start_two > 380) {
            this.secondYellowbox(-1009, .0001);
          }

          this.firstYellowbox((this.box_start), 500);
          this.secondYellowbox((this.box_start_two), 500);

          setTimeout(() => {
            this.finished = true;
          }, 500);
        }
        this.last_mouse = e.pageX;
      }
    });
  }
}
