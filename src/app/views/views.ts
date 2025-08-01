import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route } from '@angular/router';

@Component({
  selector: 'app-views',
  imports: [CommonModule,FormsModule],
  templateUrl: './views.html',
  styleUrl: './views.css'
})
export class Views {

}
