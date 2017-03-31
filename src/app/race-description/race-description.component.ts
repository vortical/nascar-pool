import { Component, OnInit } from '@angular/core';

import { RaceDescription} from '../driver.model';

@Component({
  selector: 'race-description',
  templateUrl: './race-description.component.html',
  styleUrls: ['./race-description.component.css'],
  inputs: ['raceDescription','isOngoing']
})
export class RaceDescriptionComponent implements OnInit {

  raceDescription: RaceDescription;
  isOngoing: boolean;

  constructor() { }

  ngOnInit() {
  }

}
