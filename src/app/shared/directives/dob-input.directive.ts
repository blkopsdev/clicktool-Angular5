import { Directive, ElementRef, Injector, HostListener } from '@angular/core';
import { AppComponent } from '../../app.component'

declare var $:any

@Directive({
  selector: '[appDobInput]'
})
export class DobInputDirective {
  
  val:string;
  ele:any;
  $ele:any;
  whiteListed:string[] = ['1','2','3','4','5','6', '7','8','9','0'];

   @HostListener('keypress', ['$event']) onkeypress(e) {
   	if(!this.whiteListed.includes(e.key)) {
   		return false;
   	}
   }

  @HostListener('keyup', ['$event']) onkeyup (e) {

  	if(this.whiteListed.includes(e.key)) {


	  	if(e.key != "Backspace") {
	  		this.val = this.$ele.val();
		  	var l = this.val.length
		  	if(l == 2 || l == 7 ) {
		  		this.val = this.val + " - "
		  	}
		  	this.$ele.val(this.val);
	  	}
  	}

  }

  constructor(el: ElementRef, app:AppComponent) {
  	this.$ele = $(el.nativeElement);
  	this.ele = el.nativeElement;

  }

}
