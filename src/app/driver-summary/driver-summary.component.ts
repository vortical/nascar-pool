import { Component, OnInit } from '@angular/core';

import { DriverSelection } from '../driver.model';

@Component({
  selector: 'driver-summary',
  templateUrl: './driver-summary.component.html',
  styleUrls: ['./driver-summary.component.css'],
  inputs: ['driver']
})
export class DriverSummaryComponent implements OnInit {

  driver: DriverSelection;

  constructor() { }

  ngOnInit() {
  }

}
