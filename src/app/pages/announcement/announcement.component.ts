import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BranchService } from '../../services/branch.service';
import { AnnouncementService } from '../../services/announcement.service';

import { fadeAnimation } from '../../animations/fade.animation'

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
  animations: [fadeAnimation]
})
export class AnnouncementComponent implements OnInit {

  public selectedName: string;
  public selected: boolean = false;

  @ViewChild('container') el;

  private resultSubs;
  private routeSubs;

  constructor(private route: ActivatedRoute, private branch: BranchService, private announce: AnnouncementService) { }

  ngOnInit() {

    this.el.nativeElement.scrollIntoView();

    this.routeSubs = this.route.params.subscribe(params => {
      this.branch.selectBranch(params['name']);
    });
  }

  ngOnDestroy() {
    this.routeSubs.unsubscribe(); 
  }

}
