import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VorComponent } from '../training/vor/vor.component';

declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[VorComponent]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private vor:VorComponent) { }

  ngOnInit() {
    $(document).ready(()=>{
      var $car = $('.cars-bottom');
      $car.css({"left":" "});
      $car.animate({"right":-100}, 5000);
    });
  }

  ngAfterViewInit() {
  	
  }
}
