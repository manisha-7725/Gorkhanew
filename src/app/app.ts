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
import { ExportMasterDialog } from './export-master-dialog/export-master-dialog';




@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,


],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'gorkhanew';
  readonly dialog = inject(MatDialog);
  openDialog():void{
    this.dialog.open(DialogBox);
    
  }
  // openExportDialog(): void {
  //   this.dialog.open(ExportMasterDialog, { width: '400px' });
  // }
}
