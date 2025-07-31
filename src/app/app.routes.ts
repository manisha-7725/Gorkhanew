import { Routes } from '@angular/router';
import { Master } from './master/master';
import { Transaction } from './transaction/transaction';

export const routes: Routes = [
  {path:'',redirectTo:'master',pathMatch:'full'},
  {path:'master',component:Master},
  {path:'transaction',component:Transaction}
];
