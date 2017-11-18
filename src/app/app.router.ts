import { Routes } from '@angular/router';

import { SelectBranchComponent } from './components/select-branch/select-branch.component';
import { HeaderComponent } from './components/header/header.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: SelectBranchComponent },
    { path: 'branch/:name', component: HeaderComponent },
    { path: '**', redirectTo: '' }
];