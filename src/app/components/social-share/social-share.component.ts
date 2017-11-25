import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalService } from '../../services/modal.service';
import { AnnouncementService } from '../../services/announcement.service';


@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.css']
})
export class SocialShareComponent implements OnInit {

  public currentBranch;
  public name;

  private modalToggled: boolean = false;

  constructor(private modal: ModalService, private route: ActivatedRoute, private announce: AnnouncementService) { }

  ngOnInit() {
    this.modal.getModalStatus().subscribe(status => {
        this.modalToggled = status;
    });

    this.announce.resultStatus.subscribe(status => {

      if(status === 'complete')
        this.route.queryParams.subscribe(queryParams => {
          let ref = queryParams['ref'];
          if(ref){
            let data = this.announce.searchRef(ref);
            if(data){
              this.name = data.firstName + ' ' + data.lastName;
              this.currentBranch = data.major;
            }
          }
          else {
            this.route.params.subscribe(params => {
              this.currentBranch = params['name']
              this.name = '';
            });
          }
        })

    })
  }

  copy(element) {
    element.select();
    document.execCommand('copy');
  }

  getCopyValue() {
    return window.location.href;
  }

  modalClose() {
    this.modalToggled = false;
  }

}
