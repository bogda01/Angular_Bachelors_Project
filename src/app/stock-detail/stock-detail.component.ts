import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { StockService } from '../service/stock/stock.service';
import { StockData } from '../model/stockData';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  ticker = '';
  stockData: StockData = {};
  stockDataKeys: string[] = [];
  stockDataChart: any;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.ticker = params.get('ticker')!;
          return this.stockService.getStock(this.ticker);
        })
      )
      .subscribe(
        (data: StockData) => {
          this.stockData = data;
          this.stockDataKeys = Object.keys(this.stockData);

          // Prepare chart data and options
          this.stockDataChart = {
            labels: this.stockDataKeys.map((key) => key.substring(0, 4)), // Extracting the year from the date string
            datasets: [
              {
                label: 'Adj Close',
                data: this.stockDataKeys.map((key) => this.stockData[key]['Adj Close']),
                fill: false,
                borderColor: '#4bc0c0'
              }
            ]
          };
        },
        (error) => {
          console.error('Failed to get stock data:', error);
        }
      );
  }
}
