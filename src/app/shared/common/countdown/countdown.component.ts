import { Component, OnInit, Input } from '@angular/core';

declare var Timer:any;
declare var $:any;


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  	var timer = new Timer();
  	console.log(timer);

	timer.start({countdown: true, startValues: {days: 30, hours:1, minutes:1, seconds:1}});
	timer.addEventListener('secondsUpdated', function (e) {
	    $('.timer-mod .timer-mod-days').html(timer.getTimeValues().days);
	    $('.timer-mod .timer-mod-hours').html(timer.getTimeValues().hours);
	    $('.timer-mod .timer-mod-minutes').html(timer.getTimeValues().minutes);
	    $('.timer-mod .timer-mod-seconds').html(timer.getTimeValues().seconds);
	    //$('.timer-mod .timer-mod-secondTenths').html(timer.getTimeValues().secondTenths);

	    // $('#gettingTotalValuesExample .days').html(timer.getTotalTimeValues().days);
	    // $('#gettingTotalValuesExample .hours').html(timer.getTotalTimeValues().hours);
	    // $('#gettingTotalValuesExample .minutes').html(timer.getTotalTimeValues().minutes);
	    // $('#gettingTotalValuesExample .seconds').html(timer.getTotalTimeValues().seconds);
	    // $('#gettingTotalValuesExample .secondTenths').html(timer.getTotalTimeValues().secondTenths);
	});
    
     	
  }

  

}
