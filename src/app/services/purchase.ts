import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportRow } from '../purchase-book-dialog/purchase-book-dialog';

@Injectable({
  providedIn: 'root'
})
export class Purchase {
  private apiUrl = 'http://localhost:3000/purchaseReports'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

   addReport(report: ReportRow): Observable<ReportRow> {
    return this.http.post<ReportRow>(this.apiUrl, report);
  }


  getPurchaseReports() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
