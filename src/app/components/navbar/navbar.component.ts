import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router'

import { BranchService } from '../../services/branch.service'
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public navBarShow: boolean = false;
  public searchFrom: string;
  public dropdownToggle: boolean = false;

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

  toggle() {
    this.dropdownToggle = !this.dropdownToggle;
  }

  dropdownSelected(val) {
    this.searchFrom = this.branch.branchList[val].title;
    this.router.navigate(['branch', val]);
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

  @HostListener("window:scroll", [])
  onScroll(){
    if(window.pageYOffset > 900 && this.navBarShow === false){
      this.navBarShow = true;
    }
    else if(window.pageYOffset <= 900 && this.navBarShow === true) {
      this.navBarShow = false;
      this.dropdownToggle = false;
    }
  }

  ngOnDestroy() {
    this.branchSubs.unsubscribe();
  }

}
