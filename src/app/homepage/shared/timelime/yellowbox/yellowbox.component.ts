import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Output,
    EventEmitter
  } from '@angular/core';
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

  // Inputs
  @Input() isPaused:boolean
  @Input() position:number
  @Input() month:string
  @Input() year:string
  @Input() animationSpeed:number

  // Outputs
  @Output() isYellowBoxOffScreen = new EventEmitter<number>()

  //
  @ViewChild('yellowBox') yellowBox: ElementRef;



  constructor(private animation:Animation) { }

  ngAfterViewInit() {
    this.index = this.$this.parent('app-yellowbox').data('index')
    this.repeat()
  }

  private repeat() {
    this.intervalID = setInterval(() => {
      this.position = +this.position + 20
      this.animate()
    }, +this.waitMultiplier)
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
    if(this.isPaused){
      clearInterval(this.intervalID)
    }
    if(this.isAtEndOfScreen()){
      console.log('emit')
      //console.log(this.isYellowBoxOffScreen.emit)
      this.isYellowBoxOffScreen.emit(this.index)
    }
  }

  private isAtEndOfScreen():boolean {
    return this.$this.position().left >= this.screenWidth
  }

  private removeEle() {
    this.$this.remove();
  }

  private animate() {
    this.animation.animateRight(this.yellowBox.nativeElement, this.position, this.animationSpeed, () => {
      this.animationCallback()
    })
  }

}
