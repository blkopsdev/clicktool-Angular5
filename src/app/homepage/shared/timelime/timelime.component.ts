import { Component, Output, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Animation } from '../../../shared/util/animation'
import { Box } from '../../../shared/models/box'
import { YellowboxComponent } from './yellowbox/yellowbox.component'
declare var $:any

@Component({
  selector: 'app-timelime',
  templateUrl: './timelime.component.html',
  styleUrls: ['./timelime.component.css'],
  providers:[Animation]
})
export class TimelimeComponent implements OnInit {

  isPaused:boolean = false;
  isAnimatingRight:boolean = true;
  screenWidth:number;
  pauseTime:number = 4000
  speed:number = 2000
  rightStartingPoint:number = 102

  @ViewChild('machineScreenTxt') machineTxtEle:ElementRef;

  boxes:Box[] = [
    new Box("1"),
    new Box("2"),
    new Box("3"),
    new Box("4"),
    new Box("5"),
    new Box("6"),
    new Box("7"),
    new Box("8"),
    new Box("9"),
    new Box("10")
  ]
  clonedForLeft:Box[]
  clonedForRight:Box[]

  startingCount:number = this.boxes.length - 1
 
  constructor(private animation:Animation) { }

  ngOnInit() {
    this.boxes = new Box().updateVal(this.boxes)
    this.clonedForLeft = this.boxes.map(x => Object.assign({}, x));

    this.clonedForRight = this.boxes.map(x => Object.assign({}, x));

    this.clonedForRight.reverse()
    this.clonedForRight = new Box().updateValForRight(this.clonedForRight)
    this.clonedForRight.filter($i => { $i.boxStartingPoint = this.rightStartingPoint })    

    this.boxes[this.startingCount].isEnd = true
    this.screenWidth = $(window).width()
    
    
  }

  removeAndUnshift(box:Box, boxes:Box[]) {
    
  }


  stopAnimation() {
    this.isPaused = true
  }

  animationCallback(instance:YellowboxComponent) {
    if(this.isAnimatingRight){
      this.animateRightAnimationCallback(instance)
    }else{
      this.animateLeftAnimationCallback(instance)
    }
  }

  animateLeftAnimationCallback(instance:YellowboxComponent) {
    // if(instance.index == 0){
    //   console.log(instance.index == 0 && instance.position == 102)
    // }
    

    if(instance.index == 0){
      console.log(instance.position)
    }

    if( instance.index == 0 && instance.position == 102 ) {
      setTimeout(()=>{
        this.createLoopRight()
      }, 1900)
    }
  }

  animateRightAnimationCallback(instance:YellowboxComponent) {
    if(instance.count == this.startingCount && instance.position == -18 && instance.isEnd){
      setTimeout(()=>{
         this.createLoop()
       }, 1900)
     
    } 
  }

  animateLeft() {
    this.isAnimatingRight = false;
  }

  animateRight() {
    this.isAnimatingRight = true;
  }

  onBoxOffScreen(instance:YellowboxComponent) {
    if(instance.count == 9){
      
    }
  }

  private removeItemFromBoxes(index:number) {
    this.boxes.splice(index, this.boxes.length)
  }

  createLoopRight() {


      console.log(this.clonedForRight)
      // Update clone starting point
      // this.boxes.map($i => { $i.isFirst = false })


      this.clonedForRight.filter($0 => {
        $0.isFirst = false
        this.boxes.unshift($0)
      })   

      console.log(this.boxes)

      //this.boxes[0].isFirst = true


  }

  private createLoop():Box[] {

      // Update Boxes Starting Point      

      this.boxes.map($i => { $i.isEnd = false })

      this.clonedForLeft.filter($0 => {
        $0.isEnd = false
        this.boxes.push($0)
      })

      this.boxes[this.boxes.length - 1].isEnd = true

      return this.boxes
  }



}
