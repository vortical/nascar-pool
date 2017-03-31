import { Component, OnInit } from '@angular/core';
import { NascarService } from '../nascar.service';

import { Participant, Driver, RaceDescription, DriverRaceResult } from '../driver.model';

@Component({
  selector: 'standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  drivers: Driver[];

  races: RaceDescription[];
  raceResults: DriverRaceResult[];
  participants: Participant[];
  latestRaceDescription: RaceDescription;
  showDriverSummaries: boolean = true;

  constructor(private nascarService: NascarService) {
        this.drivers = []
  }

  ngOnInit() {

    this.nascarService.getParticipants().subscribe( (participants: Participant[]) => {
            this.participants = participants;
        });

    this.nascarService.getRaceDescriptions().subscribe( (races: RaceDescription[]) => {
        console.log("Got Races", races)
        this.races = races;
    });

    this.nascarService.getLastRaceResults().subscribe( (raceResults: DriverRaceResult[]) => {
      console.log("Latest Race Results", raceResults);
      this.raceResults = raceResults;
    });

    this.nascarService.getLatestRaceDescription().subscribe( (race: RaceDescription) => {
      console.log("Latest Race Description", race);
      this.latestRaceDescription = race;
    })
  }

  isOngoing(): boolean {
    return this.nascarService.isRaceOngoing();
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
