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

  screenWidth:number = $(window).width()
  elementPosition:number;
  $this:any;
  index:number;
  intervalID:any;
  waitMultiplier:number = 2000
  isOffScreen:boolean = false;

  // Inputs
  @Input() isPaused:boolean
  @Input() position:number
  @Input() month:string
  @Input() year:string
  @Input() animationSpeed:number
  @Input() isEnd:boolean

  // Outputs
  @Output() animationCallbackEvent = new EventEmitter<YellowboxComponent>()
  @Output() isBoxOffScreen = new EventEmitter<number>()

  // Child elements
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
      
    }
  }

  animationCallback() {
    if(this.isPaused){
      clearInterval(this.intervalID)
    }

    this.animationCallbackEvent.emit(this)
    if(this.isAtEndOfScreen() && !this.isOffScreen ){
      this.isBoxOffScreen.emit(this.index)
      this.isOffScreen = true
    }
  }

  private isAtEndOfScreen():boolean {
    return this.$this.position().left >= this.screenWidth
  }

  private removeEle() {
    this.$this.remove();
  }

  private animate() {
    this.animateRight()
  }

  private animateRight() {
     this.animation.animateRight(this.yellowBox.nativeElement, this.position, this.animationSpeed, () => {
      this.animationCallback()
    })   
  }

  private emiteInstance() {
     if(this.isAtEndOfScreen() && !this.isOffScreen){
      this.animationCallbackEvent.emit(this)
      this.isOffScreen = true;
    }   
  }

}
