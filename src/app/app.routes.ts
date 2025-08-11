import { Routes } from '@angular/router';
import { Master } from './master/master';
import { Transaction } from './transaction/transaction';
import { Views } from './views/views';
import { DialogBox } from './dialog-box/dialog-box';
import { DialogView } from './dialog-view/dialog-view';



export const routes: Routes = [
  {path:'',redirectTo:'master',pathMatch:'full'},
  {path:'master',component:Master},
  {path:'transaction',component:Transaction},
  {path:'views',component:Views},
  {path:'dialog-box',component:DialogBox},
{path:'dialog-view',component:DialogView},


];
