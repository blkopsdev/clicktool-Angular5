import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ApiService, HTTPmethod } from '../../../api.service'
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

  constructor(private api?:ApiService) { }

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

  verifyMember(userId:string, accessToken:string, params:any, errCallback?:any) {
    this.api.id = null;
    this.api.filter = null;
    this.api.params = params;
    this.api.setInstanceName("Members/"+ userId +"/checkBackground?access_token=" + accessToken)
    return this.api.fire(HTTPmethod.CREATE, false, true)     
  }

}
