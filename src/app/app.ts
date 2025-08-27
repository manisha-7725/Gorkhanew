import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { DialogBox } from './dialog-box/dialog-box';
import {MatDialog} from '@angular/material/dialog';


import { FormsModule } from '@angular/forms';



@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
  
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,

    FormsModule
],


  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
    mfgNepaliDate = ''; 
  protected title = 'gorkhanew';
  readonly dialog = inject(MatDialog);
  openDialog():void{
    this.dialog.open(DialogBox);
    
  }
  // openExportDialog(): void {
  //   this.dialog.open(ExportMasterDialog, { width: '400px' });
  // }
}
