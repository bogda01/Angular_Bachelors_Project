import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import {CsvData} from "../../model/csv-data";

@Injectable({
  providedIn: 'root'
})
export class TickerService {
  data: string[] = [];

  constructor(private http: HttpClient) { }

  getTickers() {
    this.data = [];
    return new Promise((resolve, reject) => {
      this.http.get('assets/constituents.csv', {responseType: 'text'})
        .subscribe(data => {
          Papa.parse(data, {
            header: true,
            step: (row) => {
              const record = row.data as CsvData;
              this.data.push(record.Symbol);
            },
            complete: () => resolve(this.data),
            error: (error: Error) => reject(error)
          });
        });
    });
  }
}
