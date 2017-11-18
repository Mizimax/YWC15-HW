import { Routes } from '@angular/router';

import { SelectBranchComponent } from './pages/select-branch/select-branch.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: SelectBranchComponent },
    { path: 'branch/:name', component: AnnouncementComponent },
    { path: '**', redirectTo: '' }
];