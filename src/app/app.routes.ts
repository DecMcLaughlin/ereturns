import { Routes } from '@angular/router';
import {Home} from './screens/home/home';
import {authGuard} from 'src/app/guards/authGuard';
import {BulkDestructionHome} from 'src/app/screens/bulk-destruction-home/bulk-destruction-home';
import {ServicesComponent} from 'src/app/screens/service-screen/services';
import {DiscrepencyHome} from 'src/app/screens/discrepency-home/discrepency-home';
import {ReturnsDestructionHome} from 'src/app/screens/returns-home/returns-home';

export const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'home'},
  { path: 'home', component: Home, data: { title: 'Home' }, canActivate: [authGuard],},
  { path: 'services', component: ServicesComponent,  canActivate: [authGuard], children: [
       { path: 'discrepancy', component: DiscrepencyHome, data: { title: 'Discrepancy Home' } },
       { path: 'bulk-destruction', component: BulkDestructionHome, data: { title: 'Bulk Destruction Home' } },
       { path: 'returns-destruction', component: ReturnsDestructionHome, data: { title: 'Returns Destruction Home' } },
    ]},
  {
    path:'*',
    redirectTo:'home',
  }
];
