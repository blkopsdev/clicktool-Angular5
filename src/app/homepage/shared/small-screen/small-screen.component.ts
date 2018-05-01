import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Animation } from '../../../shared/util/animation'



declare var $:any

@Component({
  selector: 'app-small-screen',
  templateUrl: './small-screen.component.html',
  styleUrls: ['./small-screen.component.css']
})
export class SmallScreenComponent implements OnInit, AfterViewInit  {

  @Input() isPaused:boolean;
  @Input() isAnimatingRight:boolean;
  @Input() position:number;
  @Input() animationSpeed:number
  @Input() pauseTime:number = 2000

  @ViewChild('machineScreenTxt') machineTxtEle:ElementRef;
  $this:any;
  index:number;
  intervalID:any;
  

  constructor(private animation:Animation) { }

  ngAfterViewInit() {
    this.index = this.$this.parent('app-small-screen').data('index');   
    this.repeat()
   }

  ngOnInit() {
  	this.$this = $(this.machineTxtEle.nativeElement)
  }

  private repeat() {
    this.intervalID = setInterval(() => {
      
      if(this.isAnimatingRight){
        this.position = +this.position + 20
      }else{
        this.position = +this.position - 20
      }
      
      if(!this.isPaused){
        this.animate()
      }
    }, +this.pauseTime)
  }

  private animate() {
     this.animation.animateRight(this.machineTxtEle.nativeElement, this.position, this.animationSpeed, () => {
      this.animationCallback()
    })   
  }

  animationCallback() {
    if(this.isPaused){
      this.$this.stop(true, true)
    }
  }



}
