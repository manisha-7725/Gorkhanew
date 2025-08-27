import { Injectable } from '@angular/core';
import  adbs from 'ad-bs-converter';

@Injectable({
  providedIn: 'root'
})
export class MasterRepo {
   // Convert AD date (yyyy-MM-dd) to BS date (MM/DD/YYYY )
 toBSDate(adDate: string): string {
    if (!adDate) return '';
    const bs = adbs.ad2bs(adDate.replace(/-/g, '/'));
    return `${bs.en.day.toString().padStart(2, '0')}/${bs.en.month.toString().padStart(2,'0')}/${bs.en.year}`;
  }

  toADDate(bsDate: string): string {
    if (!bsDate) return '';
    const parts = bsDate.split('/');
    const bs = `${parts[2]}/${parts[1]}/${parts[0]}`; // YYYY/MM/DD
    const ad = adbs.bs2ad(bs);
    return `${ad.year}-${ad.month.toString().padStart(2,'0')}-${ad.day.toString().padStart(2,'0')}`;
  }
}
