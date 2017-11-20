import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BranchService } from '../../services/branch.service';

import { fadeAnimation } from '../../animations/fade.animation';

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.css'],
  animations: [fadeAnimation]
})
export class SelectBranchComponent implements OnInit {

  @ViewChild('container') el;

  public branchList;

  constructor(private router: Router, private branch: BranchService) { }

  ngOnInit() {
    this.el.nativeElement.scrollIntoView();
    this.branchList = this.branch.branchList;
  }

  branchSelected(value) {
    this.router.navigate(['branch', value]);
  }

  getBranchList() {
    return Object.keys(this.branchList);
  }

}
