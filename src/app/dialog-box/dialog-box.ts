import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-box',
  imports: [MatButtonModule, MatIconModule,MatFormFieldModule,MatInputModule,MatDialogModule,FormsModule,CommonModule],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.css'
})
export class DialogBox {
  selectedName: string = '';

data = [
  { name: 'Gorkha Brewery', code: 'C001',address:'Kritiput', vatNo: '123456789' },
  { name: 'Raj Brewery', code: 'C002',address:'Kritiput', vatNo: '123456789' },
  
];


}
