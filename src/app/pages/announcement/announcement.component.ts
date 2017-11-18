import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  public selectedName: string;
  public selected: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSelect(selectedName: string) {
    this.selectedName = selectedName;
    this.selected = true;
    console.log('test');
  }

}
