import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,RouterModule,MatTreeModule,MatIconModule,MatButtonModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'gorkhanew';
  // constructor(private router: Router) {}

  // gototransaction() {
  //   this.router.navigate(['/transaction']);
  // }
}
