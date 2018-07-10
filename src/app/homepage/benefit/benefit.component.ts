import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.css']
})
export class BenefitComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() info: string;
  @Input() imageSrc: string;
  @Input() imageAlt: string;

  constructor() { }

  ngOnInit() {
  }

}
