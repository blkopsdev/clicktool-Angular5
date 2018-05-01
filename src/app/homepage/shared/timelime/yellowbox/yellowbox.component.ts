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
  isOffScreen:boolean = false;

  // Inputs
  @Input() isPaused:boolean
  @Input() position:number
  @Input() month:string
  @Input() year:string
  @Input() animationSpeed:number
  @Input() isEnd:boolean
  @Input() isFirst:boolean
  @Input() count:number
  @Input() isAnimatingRight:boolean
  @Input() boxStartingPoint:number
  @Input() pauseTime:number

  // Outputs
  @Output() animationCallbackEvent = new EventEmitter<YellowboxComponent>()
  @Output() isBoxOffScreen = new EventEmitter<YellowboxComponent>()

  // Child elements
  @ViewChild('yellowBox') yellowBox: ElementRef;

  constructor(private animation:Animation) { }

  ngAfterViewInit() {
    this.index = this.$this.parent('app-yellowbox').data('index')
    this.repeat()
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

  ngOnInit() {
    this.$this = $(this.yellowBox.nativeElement)
  }

  animationCallback() {
    if(this.isPaused){
      this.$this.stop(true, true)
    }else{
      this.animationCallbackEvent.emit(this)
      if(this.isAtEndOfScreen() && !this.isOffScreen ){
        this.isBoxOffScreen.emit(this)
        this.isOffScreen = true
      }      
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

  private emiteInstance() {
     if(this.isAtEndOfScreen() && !this.isOffScreen){
      this.animationCallbackEvent.emit(this)
      this.isOffScreen = true;
    }   
  }

  private isEnteringMachine() {
    
  }

}
