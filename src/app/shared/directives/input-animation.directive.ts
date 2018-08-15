import { Directive, ElementRef, Injector } from '@angular/core';
import { AppComponent } from '../../app.component'

declare var $:any;

@Directive({
  selector: '[appInputAnimation]'
})
export class InputAnimationDirective {

  constructor(el: ElementRef, app:AppComponent) { 
  	var $ele = $(el.nativeElement);
  	var ele = el.nativeElement;
  	var insideLabel = $ele.closest('.form-group').find('.top-label');
  	var placeholder = $ele.attr('placeholder');
  	var $bb = $ele.closest('.form-group').find('.active-border');

  	// On Focus

  	$ele.focus(()=>{
  		ele.setAttribute('placeholder', '');
  		insideLabel.show();
  		insideLabel.animate({
  			top: -11,
  			fontSize:12,
  			color:'#1eb8d3',
  			fontWeight:500
  		}, 200);
  		this.animateFromCenter($bb);
  	});

  	// Focus out

  	$ele.focusout(()=>{
  		// If got text
  		if( !$ele.val().length ) {
			insideLabel.animate({
				top: 6,
				fontSize:15
			}, 200, ()=>{
				insideLabel.hide();
				ele.setAttribute('placeholder', placeholder);
			});
  		}else{
  			insideLabel.css({'color':'#908f8f'});
  		}
  		this.hideBorderBottom($bb); 
  	});
  	
  }


  animateFromCenter($ele) {
  	$ele.toggle({ effect: "scale", direction: "horizontal" }, 200);
  	//$ele.addClass('animated');	
  	//$ele.addClass('slideInUp');	
  }

  hideBorderBottom($ele) {
  	$ele.toggle({ effect: "scale", direction: "horizontal" }, 200);
  }

}
