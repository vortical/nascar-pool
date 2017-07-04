import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Driver, Participant, DriverSelection, RaceDescription, RaceDescriptions, DriverRaceResult } from './driver.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';



const NASCAR_BASE_URL = 'http://www.nascar.com';
const NASCAR_POINT_FEED_URL = NASCAR_BASE_URL+'/cacher/2017/1/points-feed.json';
const NASCAR_RACE_RESULT_BASE_URL = "http://www.nascar.com/content/nascar/en_us/monster-energy-nascar-cup-series/standings/results/2017/";
const NASCAR_RACE_RESULT_URL_SUFFIX = "/jcr:content/raceResults.2016RaceResults.results.json";

const RACES_URL = '/assets/data/races.json';

const DriverAdjustments = {
  "Aric Almirola":{
    name: "Aric Almirola",
    lastRacePoints:{
      raceNo :17,
      reasonForPoints: "DARRELL WALLACE JR",
      points: 24,  //22 + 2 points
      finishPosition: 15 // 15th and position 9 stage 2
    },
    totalPointsAdjustment:86, //29 + 18 -> 47 + 15 -> 62+24
    totalWinsAdjustment:0,
    totalTop5Adjustment:0,
    totalTop10Adjustoment:0
  }
};

function getDriverAdjustments(name){
  console.log("getDriverAdjustments:", name)
  var adjustements = DriverAdjustments[name];
  if(adjustements == undefined){
    console.log("getDriverAdjustments: there were none for", name)
    adjustements = {
      lastRacePoints:{},
      totalPointsAdjustment:0,
      totalWinsAdjustment:0,
      totalTop5Adjustment:0,
      totalTop10Adjustoment:0
    }

  }
  return adjustements;
}

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
    name: "Mary Belanger",
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
  s = s.replace(/\s/g,"-").toLowerCase()
  s = s.replace("'","")
  s = s.replace("\/","--")

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
  isOngoig: boolean = false;

  constructor(private http: Http) {}

  isRaceOngoing(): boolean{
    return this.isOngoig;
  }

  getLatestRaceDescription():Observable<RaceDescription>{
    return this.getRaceDescriptions().map(descriptions => {
      console.log("Got race descriptions! Now getting last race...")
      let latestRace = RaceDescriptions.getLatestRace(descriptions);
      console.log("Latest race name is:"+ latestRace);
      return latestRace;
    })

  }

  getLastRaceResults(previous?: boolean):Observable<DriverRaceResult[]>{
    // this will get the last race file from nascar website.

    var latestRace;

    // get race descriptions and find the latest race name, then call getLatestRaceResult
    return this.getRaceDescriptions().flatMap(descriptions => {
      console.log("Got race descriptions! Now getting last race...")
      latestRace = RaceDescriptions.getLatestRace(descriptions);
      if(previous){
        latestRace = RaceDescriptions.getRace(descriptions, latestRace.number-1);
        return this.getLatestRaceResult(latestRace.name, true)
      }
      console.log("Latest race name is:"+ latestRace+", now getting results from nascar site...");
      return this.getLatestRaceResult(latestRace.name)
    }).flatMap(results =>{
      if (results.length == 0){
        this.isOngoig = true;
        return this.getLastRaceResults(true);

      }else{
         return Observable.from([results]);
        // let source = Observable.create(function (observer) {
        //   observer.onNext(results);
        //   observer.onCompleted();
        // });
        // return source;
      }




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

  getLatestRaceResult(racename: string, force?: boolean):Observable<DriverRaceResult[]>{

    if (!this.latestRaceResults || force){
      let encodedRaceName = encodeRaceName(racename);
      let url = NASCAR_RACE_RESULT_BASE_URL+encodedRaceName+NASCAR_RACE_RESULT_URL_SUFFIX;
        //console.log("get lates result from site with url: "+url);
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

    return Observable.forkJoin(this.getDrivers(), this.getLastRaceResults(), this.getLatestRaceDescription()).map( r => {
      let drivers = r[0];
      let lastRaceResults = r[1];
      let latestRaceDescription: RaceDescription = r[2];


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
            let driverAdjustment =  getDriverAdjustments(driver.name);

            if(!driver){
              console.log("Did not find driver:", driverSelection.name);
            }

            if(!driverLastRaceResults){
              console.log("Did not find latest results for driver:",driver.name);

              // when this happens we'd assume that there is a replacement driver for the participan
              // what is the group for this driver:

              if (driverAdjustment){
                let lastRacePoints =  driverAdjustment.lastRacePoints;
                driverLastRaceResults = new DriverRaceResult();
                if(lastRacePoints.raceNo == latestRaceDescription.number){
                  console.log("Found corrected driver's last race points",driver.name);
                  driverLastRaceResults.points = lastRacePoints.points;
                  driverLastRaceResults.finishPosition = lastRacePoints.finishPosition;
                }else{
                  console.log("We need to correct driver's last race points",driver.name);
                  driverLastRaceResults.points = 0;
                  driverLastRaceResults.finishPosition = 99;
                }
              }
            }

            driverSelection.lastRacePoints = driverLastRaceResults.points;
            driverSelection.points = driver.points;
            points += driver.points;
            wins += driver.wins;
            top5 +=driver.top5;
            top10 += driver.top10;
            lastRacePoints += driverLastRaceResults.points
            if (driverAdjustment){
              //todo: adjust points etc....
              points += driverAdjustment.totalPointsAdjustment;
              wins += driverAdjustment.totalWinsAdjustment;
              top5 += driverAdjustment.totalTop5Adjustment;
              top10 += driverAdjustment.totalTop10Adjustoment;
              driverSelection.points += driverAdjustment.totalPointsAdjustment;
            }
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
