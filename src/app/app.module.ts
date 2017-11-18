import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';
import { SelectBranchComponent } from './pages/select-branch/select-branch.component';

import { AnnouncementService } from './services/announcement.service';

import { routes } from './app.router';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AnnouncementComponent,
    SelectBranchComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    AnnouncementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
