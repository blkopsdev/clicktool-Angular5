import { Directive, ElementRef } from '@angular/core';

declare var $:any

@Directive({
  selector: '[appFormTogglerClose]'
})
export class FormTogglerCloseDirective {

  constructor(el: ElementRef) {
  	
  }

}
