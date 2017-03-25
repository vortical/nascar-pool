import { Component, OnInit } from '@angular/core';

import { Participant } from '../driver.model';

@Component({
  selector: 'participant-row',
  templateUrl: './participant-row.component.html',
  styleUrls: ['./participant-row.component.css'],
  inputs:['participant','showDriverSummaries'],
  host: {
    class: 'row'
  }
})
export class ParticipantRowComponent implements OnInit {
  participant: Participant;

  constructor() { }

  ngOnInit() {
  }

}
