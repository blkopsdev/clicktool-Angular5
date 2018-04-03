import { Directive, ElementRef, Injector } from '@angular/core';
import { AppComponent } from '../../app.component'

@Directive({
  selector: '[appIfAdmin]'
})
export class IfAdminDirective {

  constructor(el: ElementRef, app:AppComponent) { 
  	console.log(el)
  	if(app.isAdmin()){
  		el.nativeElement.style.display = "block"
  	}else{
  		el.nativeElement.style.display = "none"
  	}
  }

}
