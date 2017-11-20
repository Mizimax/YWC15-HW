import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {

  public ResultMorningList;
  public ResultAfternoonList;
  public contentChanged: boolean = false;

  private resultSubs;

  constructor(private announce: AnnouncementService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.announce.getAllResult().subscribe( res => {

      if(res === 'complete')
        this.resultSubs = this.route.params.subscribe(params => {

          let paramName = params['name'];

          this.ResultMorningList = this.announce.Result[paramName][0];
          this.ResultAfternoonList = this.announce.Result[paramName][1];
          //fade
          this.contentChanged = true;
          setTimeout(()=> this.contentChanged = false, 600)
        })
    })
  }

  sortRef(el) {
    console.dir(el)
    if(el.innerText === '▼') {
      el.innerText = '▲';
      el.parentNode.previousElementSibling.childNodes[1].innerText = '▼';

      if(el.id === 'arrow2') {
        this.ResultMorningList = this.announce.sortRef(this.ResultMorningList);
      }
      else {
        this.ResultAfternoonList = this.announce.sortRef(this.ResultAfternoonList);
      }
    }
    else {
      el.innerText = '▼';
      el.parentNode.previousElementSibling.childNodes[1].innerText = '▼';

      if(el.id === 'arrow2') {
        this.ResultMorningList = this.announce.sortRef(this.ResultMorningList).reverse();
      }
      else {
        this.ResultAfternoonList = this.announce.sortRef(this.ResultAfternoonList).reverse();
      }
    }
  }

  sortString(el) {
    console.dir(el);
    if(el.innerText === '▼') {
      el.innerText = '▲';
      el.parentNode.nextElementSibling.childNodes[1].innerText = '▼';

      if(el.id === 'arrow1') {
        this.ResultMorningList = this.announce.sortString(this.ResultMorningList);
      }
      else {
        this.ResultAfternoonList = this.announce.sortString(this.ResultAfternoonList);
      }
    }
    else {
      el.innerText = '▼';
      el.parentNode.nextElementSibling.childNodes[1].innerText = '▼';

      if(el.id === 'arrow1') {
        this.ResultMorningList = this.announce.sortString(this.ResultMorningList).reverse();
      }
      else {
        this.ResultAfternoonList = this.announce.sortString(this.ResultAfternoonList).reverse();
      }
    }
  }

  ngOnDestroy() {
    this.resultSubs.unsubscribe();
  }

}
