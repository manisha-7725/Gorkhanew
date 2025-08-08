import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-views',
  imports: [CommonModule,FormsModule,MatSidenavModule],
  templateUrl: './views.html',
  styleUrl: './views.css'
})
export class Views {


constructor(private router: Router) {}
selectedPayment: string = '';

goBack() {
  this.router.navigate(['/master']);
}


selectedSubGroupA = '';

subGroupsA = [
  { label: 'Sudurpashim Group', value: 'sub1' },
  { label: 'test', value: 'sub2' },
  { label: 'coke', value: 'sub3' },
  { label: 'juice', value: 'sub3' },
];

}