import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';
import { SelectBranchComponent } from './pages/select-branch/select-branch.component';

import { AnnouncementService } from './services/announcement.service';
import { BranchService } from './services/branch.service';

import { routes } from './app.router';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ResultTableComponent } from './components/result-table/result-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AnnouncementComponent,
    SelectBranchComponent,
    SearchBoxComponent,
    ResultTableComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    AnnouncementService,
    BranchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
