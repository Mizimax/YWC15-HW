import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AnnouncementComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
