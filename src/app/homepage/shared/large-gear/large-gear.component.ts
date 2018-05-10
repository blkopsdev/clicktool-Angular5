import { Component, OnInit, ViewChild, ElementRef, Input  } from '@angular/core';
import { Animation } from '../../../shared/util/animation'

declare var $:any

@Component({
  selector: 'app-large-gear',
  templateUrl: './large-gear.component.html',
  styleUrls: ['./large-gear.component.css']
})
export class LargeGearComponent implements OnInit {

  @ViewChild('mileStoneGear') mileStoneGear:ElementRef;
  $this:any
  
  @Input() isPaused:boolean
  @Input() position:number
  @Input() isAnimatingRight:boolean
  @Input() animationSpeed:number
  @Input() pauseTime:number
  intervalID:any;

  constructor(private animation:Animation) { }

  ngOnInit() {
  	this.$this = $(this.mileStoneGear.nativeElement);
  	this.repeat()

  }

  private repeat() {
    this.intervalID = setInterval(() => {
      
      if(this.isAnimatingRight){
        this.position = 45
      }else{
        this.position = -45
      }
      
      if(!this.isPaused){
        this.animate()
      }
    }, +this.pauseTime)
  }

  private animate() {
     this.animation.spin(this.mileStoneGear.nativeElement, this.position, this.animationSpeed, () => {
      
    })   
  }

}
