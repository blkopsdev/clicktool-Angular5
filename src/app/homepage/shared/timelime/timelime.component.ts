import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { Animation } from '../../../shared/util/animation'
import { Box } from '../../../shared/models/box'
declare var $:any

@Component({
  selector: 'app-timelime',
  templateUrl: './timelime.component.html',
  styleUrls: ['./timelime.component.css'],
  providers:[Animation]
})
export class TimelimeComponent implements OnInit{

  isPaused:boolean = false;

  boxes:Box[] = [
    new Box("1"),
    new Box("2"),
    new Box("3"),
    new Box("4"),
    new Box("5"),
    new Box("6"),
    new Box("7")
  ]

  constructor(private animation:Animation) { }

  ngOnInit() {
    this.boxes = new Box().updateVal(this.boxes)

    // remove last item by index


    //this.stopAnimation()

    console.log(this.boxes)

  }

  stopAnimation() {
    this.isPaused = true
  }

  addNewBox(month:string, year:string) {
    //this.boxes.push(new Box(month, year))
    console.log(this.boxes)
  }

  boxOffScreen(index:number):void {

    // last item position
    //let lastItemPosition = this.boxes[this.boxes.length - 1].position

    // last item position
    let newItemCount = this.boxes[this.boxes.length - 1].count + 1
    let newPosition = -18 - (20 * newItemCount)

    var newBox = new Box("new");
    newBox.position = newPosition
    newBox.count = newItemCount

    // remove last item by index



    this.boxes.push(newBox)

    this.boxes.splice(index , 1)

    console.log(this.boxes)

    // this.boxes[this.boxes.length - 1].setPosition(newPosition)
    // // add new item to end of array



    // console.log(this.boxes);

    // let lastItemPosition = this.boxes[0].position
    // var newBox = new Box("new");
    // newBox.set
    // this.boxes.unshift()
    //console.log(this.boxes)

    //console.log(this.boxes.length)
    // remove item
    //this.removeItemFromBoxes(index)
    // add new items
    //this.addNewBox("new", "box")
    // update position


    //this.boxes = new Box().updateVal(this.boxes)
  }

  private removeItemFromBoxes(index:number) {
    this.boxes.splice(index, this.boxes.length)
  }

}
