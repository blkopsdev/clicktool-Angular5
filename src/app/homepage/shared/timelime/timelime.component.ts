import { Component, Output, OnInit, EventEmitter } from '@angular/core';
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

  isPaused:boolean = false;
  firstYellowBoxPosition:number;
  isFirstPositionSet:boolean = false

  isUsingCloned:boolean = false;
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
        this.boxesTwo.map($instance => { 
            $instance.month = "neww"
            this.boxes.push($instance) 
        })
      }      
    } 


  }

  onBoxOffScreen(index:number) {
    //this.boxes.pop()
  }

  private removeItemFromBoxes(index:number) {
    this.boxes.splice(index, this.boxes.length)
  }

  isLastBoxInFirstBoxPosition(instance:YellowboxComponent) : boolean {
    return instance.$this.position().left == this.firstYellowBoxPosition && instance.index == (this.boxes.length - 2)
  }

  isMainArrayDone() {

  }

}
