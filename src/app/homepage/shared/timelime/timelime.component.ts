import { Component, Output, OnInit, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
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
export class TimelimeComponent implements OnInit{

  @Input() isMobileOrTablet;
  isPaused:boolean = false;
  firstYellowBoxPosition:number;
  isFirstPositionSet:boolean = false
  isUsingCloned:boolean = false;
  animateSmallScreen:boolean;

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
    new Box("10"),
  ]
  boxesTwo:Box[] = [
    new Box("1"),
    new Box("2"),
    new Box("3"),
    new Box("4"),
    new Box("5"),
    new Box("6"),
    new Box("7"),
    new Box("8"),
    new Box("9"),
    new Box("10"),
  ]

  constructor(private animation:Animation) { }

  ngOnInit() {

    var ua = navigator.userAgent;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      this.isMobileOrTablet = true;
    } else if(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(ua)) {
      this.isMobileOrTablet = true;
    }

    this.boxes = new Box().updateVal(this.boxes)
    this.boxesTwo = new Box().updateVal(this.boxesTwo)
    this.boxes[this.boxes.length - 1].isEnd = true
  }

  stopAnimation() {
    this.isPaused = true
  }

  animationCallback(instance:YellowboxComponent) {

    if(this.isPaused == false){
      // Get the position of the first box animatiom position
      if(instance.index == 0 && !this.isFirstPositionSet) {
         this.firstYellowBoxPosition = instance.$this.position().left
         this.isFirstPositionSet = true
      }
      // Is last item at first item position
      if(this.isLastBoxInFirstBoxPosition(instance)){
        console.log(instance.index)
        this.boxesTwo.map($instance => {
            $instance.month = "new"
            this.boxes.push($instance)
        })
      }
    }

  }

  onBoxOffScreen(count:number) {
    if(count == 9) {
      //this.boxes.splice(0,9)
      //console.log(this.boxes)
    }
  }

  private removeItemFromBoxes(index:number) {
    this.boxes.splice(index, this.boxes.length)
  }

  isLastBoxInFirstBoxPosition(instance:YellowboxComponent) : boolean {
    return instance.$this.position().left == this.firstYellowBoxPosition && instance.count == 8
  }


}
