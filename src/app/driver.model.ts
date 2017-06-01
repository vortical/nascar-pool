

export class RaceDescriptions{

  // get the latest scheduled race before now
  static getLatestRace( races: RaceDescription[]):RaceDescription{
    let d = new Date().getTime();

    // find first race after now
    races = races.sort((r1: RaceDescription,r2: RaceDescription) => r1.number - r2.number)

    let race = races.find( function(r: RaceDescription): boolean{
        return r.scheduled.getTime() > d;
    });

    // back up one race
    let raceNumber = race.number-1;
    race =  races.find((r: RaceDescription) => r.number == raceNumber);
    console.log("found race:", race);
    return race;

  }

  static getRace( races: RaceDescription[], index: number):RaceDescription{
    let race =  races.find((r: RaceDescription) => r.number == index);
    console.log("found race:", race);
    return race;

  }



}
export class RaceDescription {
    location: string;
    name: string;
    number: number;
    distance: number;
    laps: number;
    chase_race: boolean;
    scheduled: Date;

    static mapFromData(o?: any): RaceDescription{
      let r = new RaceDescription();
      r.location = o.location;
      r.name = o.name;
      r.number = o.number;
      r.distance = o.distance;
      r.laps = o.laps;
      r.chase_race = o.chase_race;
      r.scheduled = new Date(o.scheduled);
      return r;
    }
}


export class RaceResults {
    results: DriverRaceResult[];
}



export class DriverRaceResult {
    finishPosition: number;
    inChase: boolean;
    carNumber: number;
    driverName: string;
    startPosition: number;
    laps: number;
    lapsLed: number;
    finalStatus: string;
    points: number;
    bonus: number;

    static mapFromData(obj?: any):DriverRaceResult{
      let r = new DriverRaceResult();
      if (!obj) {
          return r;
      }
      r.finishPosition = Number(obj.finish_position);
      r.inChase = Boolean(obj.is_in_chase);
      r.carNumber = Number(obj.car_number);
      r.driverName = obj.driver_name;
      r.startPosition = Number(obj.start_position);
      r.laps = Number(obj.laps);
      r.lapsLed = Number(obj.laps_led);
      r.finalStatus = obj.finalStatus;
      r.points = Number(obj.points);
      r.bonus = Number(obj.bonus);
      return r;
    }

    racePoints(): number {
        if (this.finishPosition == 1) {
            return 40;
        }
        return Math.max(1, 35 - (this.finishPosition - 2));
    }

    stagePoints(): number {
        return this.points - this.racePoints();
    }

}


export class Participant {
    position: number;
    points: number;
    wins: number;
    top5: number;
    top10: number;
    name: string;
    pointsBehind: number;
    lastRacePoints: number;
    previousPosition: number

    drivers: DriverSelection[];



    constructor(data: any) {
        this.name = data.name;
        this.drivers = data.drivers;
    }

    totalPoints(): number {
        return this.points * 1000000 + this.wins * 10000 + this.top5 * 100 + this.top10;
    }

    previousPoints(): number{
      return this.points - this.lastRacePoints;
    }

    deltaPosition(): number{
      return this.previousPosition - this.position;
    }

    deltaPositionAsString(): string{
      let dp = this.deltaPosition();
      if (dp == 0){
        return "";
      }

      if (dp >= 0){
        return "+"+dp;
      }

      return ""+dp;
    }
}


export class DriverGroups {
    groups: DriverGroup[];
}

export class DriverGroup {
    id: number;
    driverNames: DriverSelection[];
}

export class DriverSelection {
    points: number;
    lastRacePoints: number;

    constructor(public groupId: number, public name: string) {

    }
}

export class Driver {

    position: number;
    name: string;
    points: number;
    playoffPoints: number;
    playoffRank: number;
    bonusPoints: number;
    deltaNext: number;
    deltaLeader: number;
    deltaLeaderPlayoff: number;
    deltaChase: number;
    starts: number;
    poles: number;
    wins: number;
    stage1Wins: number;
    stage2Wins: number;
    top5: number;
    top10: number;
    dnf: number;
    id: number;
    firstName: string;
    lastName: string;
    nameSuffix: string;

    static mapFromObject(obj?: any): Driver {
        let d = new Driver();
        if (!obj) {
            return d;
        }
        d.position = obj.position;
        d.name = obj.driver_name;
        d.points = obj.points;
        d.playoffPoints = obj.playoff_points;
        d.playoffRank = obj.playoff_rank;
        d.bonusPoints = obj.bonus_points;
        d.deltaNext = obj.delta_next;
        d.deltaLeader = obj.delta_leader;
        d.deltaLeaderPlayoff = obj.delta_leader_playoff;
        d.deltaChase = obj.deltaChase;
        d.starts = obj.starts;
        d.poles = obj.poles;
        d.wins = obj.wins;
        d.stage1Wins = obj.stage_1_wins;
        d.stage2Wins = obj.stage_2_wins;
        d.top5 = obj.top_5;
        d.top10 = obj.top_10;
        d.dnf = obj.dnf;
        d.id = obj.driver_id;
        d.firstName = obj.driver_first_name;
        d.lastName = obj.driver_last_name;
        d.nameSuffix = obj.driver_siffix;
        return d;
    }

    constructor() {
    }
}
