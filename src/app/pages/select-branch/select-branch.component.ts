import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { fadeAnimation } from '../../animations/fade.animation'

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.css'],
  animations: [fadeAnimation]
})
export class SelectBranchComponent implements OnInit {

  public branchList = [
    {
      imgSrc: "https://ywc15.ywc.in.th/static/img/roles/content.png",
      title: "Web Content",
      route: "content"
    },
    {
      imgSrc: "https://ywc15.ywc.in.th/static/img/roles/design.png",
      title: "Web Design",
      route: "design"
    },
    {
      imgSrc: "https://ywc15.ywc.in.th/static/img/roles/marketing.png",
      title: "Web Marketing",
      route: "marketing"
    },
    {
      imgSrc: "https://ywc15.ywc.in.th/static/img/roles/programming.png",
      title: "Web Programming",
      route: "programming"
    }
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }

  branchSelected(value) {
    this.router.navigate(['branch', value]);
  }

}
