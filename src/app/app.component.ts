import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AnnouncementService } from './services/announcement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private http: HttpClient, private announce: AnnouncementService){
    this.http.get('https://ywc15.ywc.in.th/api/interview')
             .subscribe( result => {
               this.announce.setAllResult(result);
             })
  }
}
