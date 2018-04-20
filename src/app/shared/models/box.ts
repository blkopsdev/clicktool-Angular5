export class Box {
  position:number;
  month:string
  year:string
  count:number;
  constructor(month:string = "foo", year:string = ""){
    this.month = month
    this.year = year
  }

  updateVal(boxes:Box[]):Box[] {
    var count:number = 1;
   boxes.map($0 => {
      $0.position =  -18;
      $0.count = count - 1
      $0.position = $0.position - (20 * $0.count)
      count++
    })
    return boxes;
  }


  setPosition(position:number) {
    this.position = position;
  }
}
