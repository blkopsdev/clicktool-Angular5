import { Directive, ElementRef, Injector } from '@angular/core';
import { AppComponent } from '../../app.component'

declare var $:any

@Directive({
  selector: '[appEqualHeightCol]'
})
export class EqualHeightColDirective {



  constructor(el: ElementRef, app:AppComponent) {
  	var cols = $(el.nativeElement[0]).children('.col')
  	console.log(cols)
  }

}
