import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qr-card',
  templateUrl: './qr-card.component.html',
  styleUrls: ['./qr-card.component.css']
})
export class QrCardComponent implements OnInit {

  @Input() title:string
  @Input() address:string
  @Input() minimum:string
  @Input() qrImageUrl:string

  constructor() { }

  ngOnInit() {
  }

}
