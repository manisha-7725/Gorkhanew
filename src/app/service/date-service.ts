import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private apiUrl = 'http://localhost:3000/dates'; 

constructor(private http: HttpClient) {}

  // Get all dates
  getDates(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  
  // getDateById(id: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}`);
  // }

 addDate(newDate: any): Observable<any> {
    return this.http.post(this.apiUrl, newDate);
  }

  
}
