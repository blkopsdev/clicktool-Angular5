import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Animation } from '../../../shared/util/animation'

declare var $:any

@Component({
  selector: 'app-small-screen',
  templateUrl: './small-screen.component.html',
  styleUrls: ['./small-screen.component.css']
})
export class SmallScreenComponent implements OnInit, AfterViewInit  {

  @Input() startPosition:number;	
  @Input() animate:boolean;
  @Input() isPaused:boolean;

  @ViewChild('machineScreenTxt') machineTxtEle:ElementRef;
  $this:any;
  startWaitTime:number = 6000
  startWaitTimeOffSet = 4000;
  index:number;
  

  constructor(private animation:Animation) { }

  ngAfterViewInit() {
	this.index = this.$this.parent('app-small-screen').data('index');

  	if(this.index == 0){
  		var interval = this.startWaitTime
  	}else{
  		var interval = 6000 + (2000 * this.index)
  	}

  	setTimeout(()=>{
  		this.animateIn()
  	}, interval)

   }

  ngOnInit() {
  	this.$this = $(this.machineTxtEle.nativeElement)
  	this.$this.css({left:'-100%'})

  }

  animateIn() {
    if(this.isPaused){
      this.$this.stop(true, true)
    }else{
      this.animation.animateRight(this.machineTxtEle.nativeElement, 0, 2000, ()=>{
        this.animateOut()
      })      
    }

  }

  animateOut() {
    if(this.isPaused){
      this.$this.stop(true, true)
    }else{
      this.animation.animateRight(this.machineTxtEle.nativeElement, 100, 2000, ()=>{

      })        
    }
  }

  


}
