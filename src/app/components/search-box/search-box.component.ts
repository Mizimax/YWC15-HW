import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BranchService } from '../../services/branch.service';
import { AnnouncementService } from '../../services/announcement.service';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  public dropdownToggle: boolean = false;
  public searchFrom: string = 'ทั้งหมด';

  private currentBranch;
  private branchSubs;

  constructor(
    private branch: BranchService,
    private announce: AnnouncementService,
    private router: Router
  ) { }

  ngOnInit() {
    this.branchSubs = this.branch.getBranch().subscribe( branch => {
      this.currentBranch = branch;
      this.searchFrom = this.branch.getBranchTitle(branch);
    })
  }

  search(name: string) {
    let result = this.announce.searchName(name, this.currentBranch);
    if(result) {
      this.router.navigate(['branch', this.currentBranch], { queryParams: { ref: result.interviewRef }});
    }
    else {
      alert('ไม่พบรายชื่อ');
    }
  }

  toggle() {
    this.dropdownToggle = !this.dropdownToggle;
  }

  dropdownSelected(val) {
    this.searchFrom = this.branch.branchList[val].title;
    this.router.navigate(['branch', val]);
  }

  ngOnDestroy() {
    this.branchSubs.unsubscribe();
  }

}
