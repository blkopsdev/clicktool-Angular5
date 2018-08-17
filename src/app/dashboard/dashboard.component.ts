import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VorComponent } from '../training/vor/vor.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[VorComponent]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private vor:VorComponent) { }

  ngOnInit() {
  	
  }

  ngAfterViewInit() {
  	
  }
}
