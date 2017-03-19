import { Component, OnInit } from '@angular/core';
import { NascarService } from '../nascar.service';

import { Participant, Driver } from '../driver.model';

@Component({
  selector: 'standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  drivers: Driver[];

  participants: Participant[];

  constructor(private nascarService: NascarService) {
        this.drivers = []
  }

  ngOnInit() {

    this.nascarService.getParticipants().subscribe( (participants: Participant[]) => {
            this.participants = participants;
        })
  }

  sortedParticipants(): Participant[]{
    if (this.participants){
      return this.participants.sort((a: Participant, b: Participant) => b.totalPoints() - a.totalPoints());
    }
    return [];
  }

  sortedDrivers():Driver[]{
    if (this.drivers){
      return this.drivers.sort( (a: Driver, b: Driver) => b.points - a.points);
    }

    return [];
  }

}
