import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BranchService } from '../../services/branch.service';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  public dropdownToggle: boolean = false;
  public searchFrom: string = 'ทั้งหมด';

  private branchSubs;

  constructor(
    private branch: BranchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.branchSubs = this.branch.getBranch().subscribe( branch => {
      this.searchFrom = this.branch.getBranchTitle(branch);
    })
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
