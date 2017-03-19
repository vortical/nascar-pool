import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Driver, Participant, DriverSelection } from './driver.model';
import 'rxjs/add/operator/map';

const POINT_FEED_URL = 'https://www.nascar.com/cacher/2017/1/points-feed.json';

const participants = [
  new Participant({
    name: 'Paul Teasdale',
    drivers:[
      new DriverSelection(1, 'Kevin Harvick'),
      new DriverSelection(2, 'Denny Hamlin'),
      new DriverSelection(3, 'Matt Kenseth'),
      new DriverSelection(4, 'Austin Dillon'),
      new DriverSelection(5, 'Ryan Blaney'),
      new DriverSelection(6, 'Paul Menard')
    ]
  }),
  new Participant({
    name: "Stephane Belanger",
    drivers:[
      new DriverSelection(1, 'Kyle Busch'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Matt Kenseth'),
      new DriverSelection(4, 'Austin Dillon'),
      new DriverSelection(5, 'Ryan Blaney'),
      new DriverSelection(6, 'Chris Buescher')
    ]
  }),
  new Participant({
    name: "Alain Belanger",
    drivers:[
      new DriverSelection(1, 'Kevin Harvick'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Martin Truex Jr'),
      new DriverSelection(4, 'Jamie McMurray'),
      new DriverSelection(5, 'Ryan Blaney'),
      new DriverSelection(6, 'Chris Buescher')
    ]
  }),
  new Participant({
    name: "David Belanger",
    drivers:[
      new DriverSelection(1, 'Joey Logano'),
      new DriverSelection(2, 'Denny Hamlin'),
      new DriverSelection(3, 'Dale Earnhardt Jr'),
      new DriverSelection(4, 'Kasey Kahne'),
      new DriverSelection(5, 'Ryan Blaney'),
      new DriverSelection(6, 'Chris Buescher')
    ]
  }),
  new Participant({
    name: "Marie Belanger",
    drivers:[
      new DriverSelection(1, 'Joey Logano'),
      new DriverSelection(2, 'Chase Elliott'),
      new DriverSelection(3, 'Kyle Larson'),
      new DriverSelection(4, 'Kasey Kahne'),
      new DriverSelection(5, 'Trevor Bayne'),
      new DriverSelection(6, 'Paul Menard')
    ]
  }),
  new Participant({
    name: "Pier-Luc Lavallée",
    drivers:[
      new DriverSelection(1, 'Kyle Busch'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Martin Truex Jr'),
      new DriverSelection(4, 'Jamie McMurray'),
      new DriverSelection(5, 'Ryan Blaney'),
      new DriverSelection(6, 'Paul Menard')
    ]
  }),
  new Participant({
    name: "Jacques Demers",
    drivers:[
      new DriverSelection(1, 'Joey Logano'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Matt Kenseth'),
      new DriverSelection(4, 'Kasey Kahne'),
      new DriverSelection(5, 'Ryan Blaney'),
      new DriverSelection(6, 'Chris Buescher')
    ]
  }),

  new Participant({
    name: "Martin Ethier",
    drivers:[
      new DriverSelection(1, 'Brad Keselowski'),
      new DriverSelection(2, 'Chase Elliott'),
      new DriverSelection(3, 'Dale Earnhardt Jr'),
      new DriverSelection(4, 'Kasey Kahne'),
      new DriverSelection(5, 'Ricky Stenhouse Jr'),
      new DriverSelection(6, 'Paul Menard')
    ]
  }),

  new Participant({
    name: "Jean-Francois Miville",
    drivers:[
      new DriverSelection(1, 'Brad Keselowski'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Dale Earnhardt Jr'),
      new DriverSelection(4, 'Austin Dillon'),
      new DriverSelection(5, 'Ricky Stenhouse Jr'),
      new DriverSelection(6, 'Paul Menard')
    ]
  }),

  new Participant({
    name: "Jonathan Belanger",
    drivers:[
      new DriverSelection(1, 'Brad Keselowski'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Dale Earnhardt Jr'),
      new DriverSelection(4, 'Kasey Kahne'),
      new DriverSelection(5, 'Trevor Bayne'),
      new DriverSelection(6, 'Chris Buescher')
    ]
  }),
  //Francois Belanger
  new Participant({
    name: "Francois Belanger",
    drivers:[
      new DriverSelection(1, 'Kevin Harvick'),
      new DriverSelection(2, 'Denny Hamlin'),
      new DriverSelection(3, 'Kyle Larson'),
      new DriverSelection(4, 'Austin Dillon'),
      new DriverSelection(5, 'AJ Allmendinger'),
      new DriverSelection(6, 'Danica Patrick')
    ]
  }),

  new Participant({
    name: "Julien Belanger",
    drivers:[
      new DriverSelection(1, 'Joey Logano'),
      new DriverSelection(2, 'Chase Elliott'),
      new DriverSelection(3, 'Martin Truex Jr'),
      new DriverSelection(4, 'Kasey Kahne'),
      new DriverSelection(5, 'Ricky Stenhouse Jr'),
      new DriverSelection(6, 'Chris Buescher')
    ]
  }),

  new Participant({
    name: "Julie Beaudoin",
    drivers:[
      new DriverSelection(1, 'Kevin Harvick'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Matt Kenseth'),
      new DriverSelection(4, 'Jamie McMurray'),
      new DriverSelection(5, 'Ryan Blaney'),
      new DriverSelection(6, 'Paul Menard')
    ]
  }),

  new Participant({
    name: "Martin Belanger",
    drivers:[
      new DriverSelection(1, 'Joey Logano'),
      new DriverSelection(2, 'Denny Hamlin'),
      new DriverSelection(3, 'Matt Kenseth'),
      new DriverSelection(4, 'Kasey Kahne'),
      new DriverSelection(5, 'Ryan Blaney'),
      new DriverSelection(6, 'Paul Menard')
    ]
  }),

  new Participant({
    name: "Marc Belanger",
    drivers:[
      new DriverSelection(1, 'Kevin Harvick'),
      new DriverSelection(2, 'Denny Hamlin'),
      new DriverSelection(3, 'Matt Kenseth'),
      new DriverSelection(4, 'Austin Dillon'),
      new DriverSelection(5, 'Trevor Bayne'),
      new DriverSelection(6, 'Paul Menard')
    ]
  }),

  new Participant({
    name: "Guy Deblois",
    drivers:[
      new DriverSelection(1, 'Brad Keselowski'),
      new DriverSelection(2, 'Chase Elliott'),
      new DriverSelection(3, 'Matt Kenseth'),
      new DriverSelection(4, 'Jamie McMurray'),
      new DriverSelection(5, 'Ricky Stenhouse Jr'),
      new DriverSelection(6, 'Chris Buescher')
    ]
  }),
  //Andre Lefebvre
  new Participant({
    name: "Andre Lefebvre",
    drivers:[
      new DriverSelection(1, 'Kevin Harvick'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Martin Truex Jr'),
      new DriverSelection(4, 'Austin Dillon'),
      new DriverSelection(5, 'Ryan Blaney'),
      new DriverSelection(6, 'Aric Almirola')
    ]
  }),
  //Gerald Patenaude
  new Participant({
    name: "Gerald Patenaude",
    drivers:[
      new DriverSelection(1, 'Kevin Harvick'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Dale Earnhardt Jr'),
      new DriverSelection(4, 'Jamie McMurray'),
      new DriverSelection(5, 'Ryan Blaney'),
      new DriverSelection(6, 'Danica Patrick')
    ]
  }),
  //Jean Lemire
  new Participant({
    name: "Jean Lemire",
    drivers:[
      new DriverSelection(1, 'Kyle Busch'),
      new DriverSelection(2, 'Chase Elliott'),
      new DriverSelection(3, 'Kyle Larson'),
      new DriverSelection(4, 'Austin Dillon'),
      new DriverSelection(5, 'Trevor Bayne'),
      new DriverSelection(6, 'Paul Menard')
    ]
  }),
  //
  new Participant({
    name: "Robert Lacharité",
    drivers:[
      new DriverSelection(1, 'Joey Logano'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Kyle Larson'),
      new DriverSelection(4, 'Kasey Kahne'),
      new DriverSelection(5, 'Trevor Bayne'),
      new DriverSelection(6, 'Aric Almirola')
    ]
  }),
  //Rolland Courchesne
  new Participant({
    name: "Rolland Courchesne",
    drivers:[
      new DriverSelection(1, 'Kevin Harvick'),
      new DriverSelection(2, 'Jimmie Johnson'),
      new DriverSelection(3, 'Matt Kenseth'),
      new DriverSelection(4, 'Austin Dillon'),
      new DriverSelection(5, 'Trevor Bayne'),
      new DriverSelection(6, 'Chris Buescher')
    ]
  })
];





@Injectable()
export class NascarService {

  drivers: Observable<Driver[]>;

  constructor(private http: Http) {}


  getParticipants(): Observable<Participant[]>{
    return this.getDrivers().map((drivers: Driver[]) => {
      // at this point I have all the drivers, let's fill up our participant strutures!
      participants.forEach((p: Participant)=>{
          console.log("PARTICIPANT: "+p.name);
          let driverSelections = p.drivers;
          let points = 0;
          let wins = 0;
          let top5 = 0;
          let top10 = 0;

          driverSelections.forEach((driverSelection: DriverSelection) => {
            let driver = drivers.find((d: Driver) => d.name == driverSelection.name);
            if(!driver){
              console.log("Did not find driver:", driverSelection.name);
            }
            console.log("driver points: "+driverSelection.name +" points:"+ driver.points);
            driverSelection.points = driver.points;
            points += driver.points;
            wins += driver.wins;
            top5 +=driver.top5;
            top10 += driver.top10;

          })
          p.points = points;
          p.wins = wins;
          p.top5 = top5;
          p.top10 = top10;

      })

      let sortedParticpants = participants.sort((a: Participant, b: Participant) => b.totalPoints() - a.totalPoints());

      let leaderPoints = sortedParticpants[0].points;
      sortedParticpants.forEach((p: Participant, i) => {
        p.position = i+1;
        p.pointsBehind = leaderPoints - p.points;
      });


      return sortedParticpants;
    })
  }

  getDrivers(): Observable<Driver[]> {
    if (!this.drivers){
      this.drivers = this.http.get(POINT_FEED_URL)
        .map((response: Response) => {
          return (<any>response.json()).map( driver => {
            return Driver.mapFromObject(driver);
          })
      })
    }
    return this.drivers;
  }
}
