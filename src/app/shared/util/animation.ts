declare var $: any;

export class Animation {

  rotate(ele:any, deg:number) {

  }

  animateRight(ele:any, value:number, speed:any = 1000, cb:any = null):any {
    return $(ele).animate({
      left:value + '%'
    }, +speed, null, cb)
  }

  animateLeft(ele:any, value:number, speed:any = 1000, cb:any = null):any {
    return $(ele).animate({
      left:value + '%'
    }, +speed, null, cb)
  }

  spin(ele:any, value:number, speed:any = 1000, cb:any = null):any {
    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    return $({deg: 0}).animate({deg: value}, {
        duration: speed,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $(ele).css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });   
  }

}
