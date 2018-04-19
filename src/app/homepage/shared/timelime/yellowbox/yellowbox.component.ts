import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Animation } from '../../../../shared/util/animation'

declare var $:any

@Component({
  selector: 'app-yellowbox',
  templateUrl: './yellowbox.component.html',
  styleUrls: ['./yellowbox.component.css'],
  providers:[Animation]
})
export class YellowboxComponent implements OnInit, AfterViewInit {

  private screenWidth:number = $(window).width()
  private elementPosition:number;
  private $this:any;
  private index:number;
  private intervalID:any;
  private waitMultiplier:number = 2000
  private animationInstance:any

  @Input() isPaused:string
  @Input() position:number
  @Input() month:string
  @Input() year:string
  @Input() animationSpeed:number

  @ViewChild('yellowBox') yellowBox: ElementRef;


  constructor(private animation:Animation) { }

  ngAfterViewInit() {
    this.index = this.$this.parent('app-yellowbox').data('index')
    console.log(this.isPaused === 'false')
    this.wait()
    this.repeat()
    this.pause()
  }

  private wait() {

    //console.log('Box: ', this.index, " wait: ", this.waitMultiplier * this.index, "repeat: ",  this.waitMultiplier * this.index)

    setTimeout(() => {
      this.animate()
    }, 0)

  }

  private repeat() {
     this.intervalID = setInterval(() => {
      this.position = +this.position + 20
      this.animate()
    }, +this.waitMultiplier)
  }

  pause() {
    // if(this.isPaused === true) {
    //   this.$this.stop()
    //   this.animationInstance.clearQueue()
    // }
  }

  ngOnInit() {
    this.$this = $(this.yellowBox.nativeElement)

  }

  checkRemove() {
    if(this.isAtEndOfScreen()) {
      this.removeEle()
    }
  }

  animationCallback() {

    //this.checkRemove()
  }

  private isAtEndOfScreen():boolean {
    return this.$this.position().left >= this.screenWidth
  }

  private removeEle() {
    this.$this.remove();
  }

  private animate() {
    this.animationInstance = this.animation.animateRight(this.yellowBox.nativeElement, this.position, this.animationSpeed, () => {
      this.animationCallback()
    })
  }

}
