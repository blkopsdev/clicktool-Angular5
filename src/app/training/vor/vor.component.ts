import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vor',
  templateUrl: './vor.component.html',
  styleUrls: ['./vor.component.css']
})
export class VorComponent implements OnInit {

  vor:string = "vor works! we knows it works"

  constructor() { }

  ngOnInit() {
  }

  addStringToEnd():string {
  	return this.vor + " is leaving work"
  }

  runFunction() {
  	this.vor = "we just clicked the button";
  }

  alertVor(changeVorString:string) {
    this.vor = changeVorString;
  }

}
