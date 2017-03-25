import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Driver, Participant, DriverSelection, RaceDescription, RaceDescriptions, DriverRaceResult } from './driver.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';



const NASCAR_BASE_URL = 'https://www.nascar.com';
const NASCAR_POINT_FEED_URL = NASCAR_BASE_URL+'/cacher/2017/1/points-feed.json';
const NASCAR_RACE_RESULT_BASE_URL = "http://www.nascar.com/content/nascar/en_us/monster-energy-nascar-cup-series/standings/results/2017/";
const NASCAR_RACE_RESULT_URL_SUFFIX = "/jcr:content/raceResults.2016RaceResults.results.json";

const RACES_URL = '/assets/data/races.json';

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

// return lowercase dash separated string
function encodeRaceName(s: string): string{
  return s.replace(/\s/g,"-").toLowerCase()
  //return "daytona-500";
}


@Injectable()
export class NascarService {
// See this for concurrent requests:
//https://www.metaltoad.com/blog/angular-2-http-observables-and-concurrent-data-loading
  races: Observable<RaceDescription[]>;
  drivers: Observable<Driver[]>;
  latestRaceResults:Observable<DriverRaceResult[]>;

  constructor(private http: Http) {}


  getLatestRaceDescription():Observable<RaceDescription>{
    return this.getRaceDescriptions().map(descriptions => {
      console.log("Got race descriptions! Now getting last race...")
      let latestRace = RaceDescriptions.getLatestRace(descriptions);
      console.log("Latest race name is:"+ latestRace);
      return latestRace;
    })

  }

  getLastRaceResults():Observable<DriverRaceResult[]>{
    // this will get the last race file from nascar website.

    // get race descriptions and find the latest race name, then call getLatestRaceResult
    return this.getRaceDescriptions().flatMap(descriptions => {
      console.log("Got race descriptions! Now getting last race...")
      let latestRace = RaceDescriptions.getLatestRace(descriptions);
      console.log("Latest race name is:"+ latestRace+", now getting results from nascar site...");
      return this.getLatestRaceResult(latestRace.name);
    })
  }

  getRaceDescriptions(): Observable<RaceDescription[]>{
    if (!this.races){
      this.races = this.http.get(RACES_URL)
        .map((response: Response) => {
          return response.json().map( r => {
            return RaceDescription.mapFromData(r);
          })
      })
    }
    return this.races;
  }

  getLatestRaceResult(racename: string):Observable<DriverRaceResult[]>{

    if (!this.latestRaceResults){
      let encodedRaceName = encodeRaceName(racename);
      let url = NASCAR_RACE_RESULT_BASE_URL+encodedRaceName+NASCAR_RACE_RESULT_URL_SUFFIX;
        console.log("get lates result from site with url: "+url);
      this.latestRaceResults = this.http.get(url)
        .map((response: Response) => {
          return  response.json().results.map(obj => {
              return DriverRaceResult.mapFromData(obj);
          })
        })
    }
    return this.latestRaceResults;
  }


  getParticipants(): Observable<Participant[]>{

    return Observable.forkJoin(this.getDrivers(), this.getLastRaceResults()).map( r => {
      let drivers = r[0];
      let lastRaceResults = r[1];


      participants.forEach((p: Participant)=>{

          let driverSelections = p.drivers;
          let points = 0;
          let wins = 0;
          let top5 = 0;
          let top10 = 0;
          let lastRacePoints = 0;

          driverSelections.forEach((driverSelection: DriverSelection) => {
            let driver = drivers.find((d: Driver) => d.name == driverSelection.name);
            let driverLastRaceResults = lastRaceResults.find((r:DriverRaceResult) => r.driverName == driverSelection.name);

            if(!driver){
              console.log("Did not find driver:", driverSelection.name);
            }

            driverSelection.lastRacePoints = driverLastRaceResults.points;
            driverSelection.points = driver.points;
            points += driver.points;
            wins += driver.wins;
            top5 +=driver.top5;
            top10 += driver.top10;
            lastRacePoints += driverLastRaceResults.points

          })
          p.points = points;
          p.wins = wins;
          p.top5 = top5;
          p.top10 = top10;
          p.lastRacePoints = lastRacePoints;

      })

      let sortedParticpants = participants.sort((a: Participant, b: Participant) => b.totalPoints() - a.totalPoints());

      let leaderPoints = sortedParticpants[0].points;
      sortedParticpants.forEach((p: Participant, i) => {
        p.position = i+1;
        p.pointsBehind = leaderPoints - p.points;
      });

      let previousRaceSortedParticipants = participants.sort((a: Participant, b: Participant) => b.previousPoints() - a.previousPoints());
      previousRaceSortedParticipants.forEach((p: Participant, i) =>{
        p.previousPosition = i+1;
      })

      return sortedParticpants;
    });


  }

  getDrivers(): Observable<Driver[]> {
    if (!this.drivers){
      this.drivers = this.http.get(NASCAR_POINT_FEED_URL)
        .map((response: Response) => {
          return (<any>response.json()).map( driver => {
            return Driver.mapFromObject(driver);
          })
      })
    }
    return this.drivers;
  }
}
