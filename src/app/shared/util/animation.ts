declare var $: any;

export class Animation {

  rotate(ele:any, deg:number) {

  }

  animateRight(ele:any, value:number, speed:any = 1000, cb:any = null):any {
    return $(ele).animate({
      left:value + '%'
    }, +speed, null, cb)
  }

}
