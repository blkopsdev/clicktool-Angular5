import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ct-preloader',
  templateUrl: './ct-preloader.component.html',
  styleUrls: ['./ct-preloader.component.css']
})
export class CtPreloaderComponent implements OnInit {

  @Input() isHidden:boolean = true;	

  constructor() { }

  ngOnInit() {
  }

}
