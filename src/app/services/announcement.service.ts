import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AnnouncementService {

  private initialResult = {
    firstName: 'กำลังโหลด',
    lastName: '',
    interviewRef: 'กำลังโหลด'
  }

  private allResult;
  public resultStatus = new BehaviorSubject<any>(undefined);

  public Result = {};

  constructor() { }

  setAllResult(data) {
    this.allResult = data

    this.toEachBranchResult('content');
    this.toEachBranchResult('design');
    this.toEachBranchResult('marketing');
    this.toEachBranchResult('programming');
    this.Result['all'] = [
      [
        ...this.Result['content'][0],
        ...this.Result['design'][0],
        ...this.Result['marketing'][0],
        ...this.Result['programming'][0]
      ],
      [
        ...this.Result['content'][1],
        ...this.Result['design'][1],
        ...this.Result['marketing'][1],
        ...this.Result['programming'][1]
      ]
    ];

    this.resultStatus.next('complete');
  }

  toEachBranchResult(branch: string) {

    let res = this.allResult;
    let result, morningResult, afternoonResult;

    result = res.filter(data => data.major === branch);   
      
    result = this.sortRef(result);

    if(branch === 'content'){
      morningResult = result.slice(0,25);
      afternoonResult = result.slice(25,result.length);
    }
    else if(branch === 'design'){
      morningResult = result.slice(0,20);
      afternoonResult = result.slice(20,result.length);
    }
    else if(branch === 'marketing'){
      morningResult = result.slice(0,18);
      afternoonResult = result.slice(18,result.length);
    }
    else if(branch === 'programming'){
      morningResult = result.slice(0,23);
      afternoonResult = result.slice(23,result.length);
    }

    this.Result[branch] = [morningResult,afternoonResult];

  }

  searchRef(ref: string) {
    let result = this.allResult.filter(data => data.interviewRef === ref);
    return result[0];
  }

  searchName(name: string, branch: string) {
    let morningResult = this.Result[branch][0].filter(data => {
      let fullName = data['firstName'] + ' ' + data['lastName'];
      return ~fullName.indexOf(name)
    });

    let afternoonResult = this.Result[branch][1].filter(data => {
      let fullName = data['firstName'] + ' ' + data['lastName'];
      return ~fullName.indexOf(name)
    });

    let result = [...morningResult, ...afternoonResult]
    return result[0];
  }

  sortRef(data: object[]) {

    data.sort((a: any, b: any) => {
       return Number(a.interviewRef.slice(2)) - Number(b.interviewRef.slice(2));
    });

    return data;
  }

  sortString(data: object[]) {
    data.sort((a: any, b: any) => {
       return a.firstName.localeCompare(b.firstName);;
    });

    return data;
  }

  getAllResult() {
    return this.allResult;
  }

  getMorningResult() {
    return this.Result;
  }

}
