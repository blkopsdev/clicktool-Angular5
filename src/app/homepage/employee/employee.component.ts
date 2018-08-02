import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() name: string;
  @Input() role: string;
  @Input() imageSrc: string;
  @Input() icon: boolean;

  constructor() { }

  ngOnInit() {
  }

}
