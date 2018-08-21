import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  

  


  constructor() { }

  ngOnInit() {
  }

  saveSettings(fields:any) {
  	console.log(fields)
  }

}
