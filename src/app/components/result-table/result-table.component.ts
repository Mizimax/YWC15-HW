import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AnnouncementService } from '../../services/announcement.service';
import { ModalService } from '../../services/modal.service';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {

  public ResultMorningList;
  public ResultAfternoonList;
  public contentChanged: boolean = false;

  private currentBranch = '444';

  private resultSubs;
  private statusSubs;

  @ViewChild('arrow1') arr1;
  @ViewChild('arrow2') arr2;
  @ViewChild('arrow3') arr3;
  @ViewChild('arrow4') arr4;

  constructor(
    private announce: AnnouncementService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private pageScrollService: PageScrollService,
    private modal: ModalService
  ) { }

  ngOnInit() {
    this.statusSubs = this.announce.resultStatus.subscribe( res => {

      if(res === 'complete') {
        this.resultSubs = this.route.params.subscribe(params => {

          let paramName = params['name'];

          //set new result
          this.ResultMorningList = this.announce.Result[paramName][0];
          this.ResultAfternoonList = this.announce.Result[paramName][1];

          if(this.currentBranch !== paramName){

            this.resetSort(); //reset sort
            //fade
            this.contentChanged = true;
            setTimeout(()=> this.contentChanged = false, 600)
          }
          console.log(this.currentBranch)
          this.currentBranch = paramName;

        })

        this.route.queryParams.subscribe( queryParams => {
          let paramId = queryParams['ref'];
          //scroll to result if has id
          if(paramId) {
            setTimeout(()=>{
              this.scrollToId('#' + paramId);
              this.toggleSelectedName(paramId);
            }, 50);
          }
        })

      }
    })
  }

  scrollToId(element: string) {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({document: this.document, scrollTarget: element, pageScrollOffset: 200, pageScrollDuration: 500});
    this.pageScrollService.start(pageScrollInstance);
  }

  toggleSelectedName(id: string) {
    let now = document.querySelector('.now');
    let clicked = document.querySelector('#' + id)
    if(now && now != clicked)
      now.classList.remove('now');
    clicked.classList.toggle('now');
  }

  share(id: string) {
    this.modal.setModalStatus(true);
    this.router.navigate(['branch', this.currentBranch], { queryParams: { ref: id } })
  }

  sortRef(el) {
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

  resetSort() {
    this.arr1.nativeElement.innerText = '▼';
    this.arr2.nativeElement.innerText = '▲';
    this.arr3.nativeElement.innerText = '▼';
    this.arr4.nativeElement.innerText = '▲';
  }

  ngOnDestroy() {
    this.resultSubs.unsubscribe();
    this.statusSubs.unsubscribe();
  }

}
