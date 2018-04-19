import { Component, Output, OnInit } from '@angular/core';
import { Animation } from '../../../shared/util/animation'

declare var $:any

class Box {
  position:number = -18;
  month:string
  year:string
  constructor(month:string = "foo", year:string = ""){
    this.month = month
    this.year = year
  }

  updateVal(boxes:Box[]):Box[] {
   boxes.forEach(($0, i) => {
      console.log(i)
      $0.position = $0.position - (20 * i)

    })
    return boxes;
  }
}

@Component({
  selector: 'app-timelime',
  templateUrl: './timelime.component.html',
  styleUrls: ['./timelime.component.css'],
  providers:[Animation]
})
export class TimelimeComponent implements OnInit{

  initValue:number = -18;
  yellowBox:any;
  isAnimationPaused:boolean = false;
  boxes:Box[] = [
    new Box("1"),
    new Box("2"),
    new Box("3"),
    new Box("3"),
    new Box("3"),
    new Box("3"),
    new Box("3")
  ]

  constructor(private animation:Animation) { }

  ngAfterContentInit() {

  }

  ngOnInit() {


    let b:Box[] = new Box().updateVal(this.boxes)
    this.boxes = b;

    this.boxes.reverse()
    this.initEle();
    this.animationInterval()

    $('.directions').on('click', () => {
      this.isAnimationPaused = true
    })
  }

  initEle() {

  }

  cloneYellowBox() {

  }

  animationInterval() {

  }




}
