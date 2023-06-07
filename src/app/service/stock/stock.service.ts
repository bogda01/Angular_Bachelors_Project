import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {StockData} from "../../model/stockData";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) {}

  getStock(ticker: string): Observable<StockData> {
    return this.http.get<StockData>(`assets/Stock_data2/${ticker}.json`);
  }
}
