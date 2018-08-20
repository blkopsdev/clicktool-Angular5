import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  	setTimeout(()=>{
      //this.spin();
  	});

   
    this.spinInterval();
  

  }

  private spin() {
      $('#timeline-gear').animate({'left':350}, {
        duration:1000,
        step: function(now,fx) {
            $(this).css('-webkit-transform','rotate('+now+'deg)'); 
        },
        complete: function(){
          $('#timeline-gear').addClass('pulse');
          $('#timeline-container').removeClass('slideInDown');
          $('#timeline-container').addClass('pulse');
        },
      });
  }

  private spinInterval() {
      $('#timeline-gear').animate({'left':350}, {
        duration:1000,
        step: function(now,fx) {
            $(this).css('-webkit-transform','rotate('+now+'deg)'); 
        }
      });
  }

}
