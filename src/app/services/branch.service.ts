import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BranchService {

  private branchSelected = new BehaviorSubject<string>('all'); ;

  public branchList = {
    content : {
      imgSrc: "https://ywc15.ywc.in.th/static/img/roles/content.png",
      title: "Web Content",
      route: "content"
    },
    design : {
      imgSrc: "https://ywc15.ywc.in.th/static/img/roles/design.png",
      title: "Web Design",
      route: "design"
    },
    marketing : {
      imgSrc: "https://ywc15.ywc.in.th/static/img/roles/marketing.png",
      title: "Web Marketing",
      route: "marketing"
    },
    programming : {
      imgSrc: "https://ywc15.ywc.in.th/static/img/roles/programming.png",
      title: "Web Programming",
      route: "programming"
    },
    all : {
      title: "ทั้งหมด",
      route: "all"
    }
  }

  constructor() { }

  selectBranch(branch: string) {
    this.branchSelected.next(branch);
  }

  getBranch() {
    return this.branchSelected;
  }

  getBranchTitle(branch) {
    return this.branchList[branch].title || 'ทั้งหมด';
  }

}
