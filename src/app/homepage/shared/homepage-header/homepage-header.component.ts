import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-header',
  templateUrl: './homepage-header.component.html',
  styleUrls: ['./homepage-header.component.css']
})
export class HomepageHeaderComponent implements OnInit {

  public tabshow: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /* toggle() {
    this.tabshow = !this.tabshow;

    // CHANGE THE NAME OF THE BUTTON.
  } */

}
