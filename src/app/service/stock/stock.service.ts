import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {StockData} from "../../model/stockData";
import {PredictionData} from "../../model/prediction";
import {MACDData} from "../../model/MACD";
import {MonteCarloData} from "../../model/MonteCarlo";
import {RSIData} from "../../model/RSI";
import {SMAData} from "../../model/SMA";
import {VARData} from "../../model/VAR";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) {}

  getStock(ticker: string): Observable<StockData> {
    return this.http.get<StockData>(`assets/Stock_data2/${ticker}.json`);
  }
  getLSTMStock(ticker: string): Observable<PredictionData> {
    return this.http.get<PredictionData>(`assets/LSTM/${ticker}.json`);
  }
  getCNNStock(ticker: string): Observable<PredictionData> {
    return this.http.get<PredictionData>(`assets/CNN/${ticker}.json`);
  }
  getGRUStock(ticker: string): Observable<PredictionData> {
    return this.http.get<PredictionData>(`assets/GRU/${ticker}.json`);
  }
  getProphetStock(ticker: string): Observable<PredictionData> {
    return this.http.get<PredictionData>(`assets/Prophet/${ticker}.json`);
  }
  getMACDStock(ticker: string): Observable<MACDData> {
    return this.http.get<MACDData>(`assets/MACD/${ticker}.json`);
  }
  getMonteCarloStock(ticker: string): Observable<MonteCarloData> {
    return this.http.get<MonteCarloData>(`assets/Monte Carlo/${ticker}.json`);
  }
  getRSIStock(ticker: string): Observable<RSIData> {
    return this.http.get<RSIData>(`assets/RSI/${ticker}.json`);
  }
  getSMAStock(ticker: string): Observable<SMAData> {
    return this.http.get<SMAData>(`assets/SMA/${ticker}.json`);
  }
  getVARStock(ticker: string): Observable<VARData> {
    return this.http.get<VARData>(`assets/VAR/${ticker}.json`);
  }

}
