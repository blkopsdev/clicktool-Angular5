import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  
  btcValue:number = 0.12;
  btcCalculated:number = 0.12;

  ethValue:number = 0.15;
  ethCalculated:number = 0.15;
  
  usdValue:number = 0.20;		
  usdCalculated:number = 0.20;		

  currentValue:number = 0;
  @ViewChild("#exchangeRate") slider: ElementRef;

  constructor() { }

  ngOnInit() {
  	console.log(this.slider)
  	var inputValue = (<HTMLInputElement>document.getElementById("rate-exchange-slider")).value;
  	$("#rate-exchange-slider").on("input change", () => {
  		this.currentValue = parseInt((<HTMLInputElement>document.getElementById("rate-exchange-slider")).value);
  		this.btcCalculated = this.btcValue * this.currentValue;
  		this.ethCalculated = this.ethValue * this.currentValue;
  		this.usdCalculated = this.usdValue * this.currentValue;
  	});
  }

  updateValue() {
  	//console.log('foooo');
  }

  getBtcRate() {
  	
  }

}
