import { Directive, ElementRef, Injector } from '@angular/core';
import { AppComponent } from '../../app.component'

declare var $:any

@Directive({
  selector: '[appEqualHeightCol]'
})
export class EqualHeightColDirective {

  colHeight:number[] = []
  el:ElementRef

  constructor(el: ElementRef, app:AppComponent) {
  	this.el = el
  	$(document).ready(()=>{
  		this.resizeColumns()
  	})
  	$(window).resize(()=>{
  		this.resizeColumns()
  	})
  }

  resizeColumns() {
	var cols = $(this.el.nativeElement).children()
	cols.map($i => {
		var col = $(cols[$i])
		var height = col.outerHeight();
		this.colHeight.push(height)	
	})
	var largestColHeight = Math.max.apply(null, this.colHeight)
	console.log(largestColHeight)
	cols.map($i => {
		var col = $(cols[$i])
		col.find('.white-bg').css({'min-height':largestColHeight})
	})  	
  }

}
