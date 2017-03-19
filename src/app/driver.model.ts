

export class Participant{
  position: number;
  points: number;
  wins: number;
  top5: number;
  top10: number;
  name: string;
  pointsBehind: number;
  drivers: DriverSelection[];

  constructor(data: any){
    this.name = data.name;
    this.drivers = data.drivers;
  }

  totalPoints(): number{
    return this.points * 1000000 + this.wins *10000 + this.top5 *100 +this.top10;
  }
}


export class DriverGroups{
  groups: DriverGroup[];
}

export class DriverGroup{
  id: number;
  driverNames: DriverSelection[];
}

export class DriverSelection{
  points: number;

  constructor(public groupId: number, public name: string){

  }
}

export class Driver{

  position: number;
  name: string;
  points: number;
  playoffPoints: number;
  playoffRank: number;
  bonusPoints: number;
  deltaNext:  number;
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

  static mapFromObject(obj?: any): Driver{
    let d = new Driver();
    if (!obj){
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
