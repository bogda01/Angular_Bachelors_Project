import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { StockService } from '../service/stock/stock.service';
import { StockData } from '../model/stockData';
import {SelectItem} from "primeng/api";

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
  chartOptions: any;

  // dropdown risk management
  riskManagementTypes: SelectItem[] = [
    { label: 'SMA Chart', value: 'sma' },
    { label: 'RSI Chart', value: 'rsi' },
    { label: 'MACD Chart', value: 'macd' },
    { label: 'Monte Carlo Chart', value: 'monte' },
    { label: 'Value at Risk', value: 'var' },
  ];
  selectedRiskManagementType: SelectItem = this.riskManagementTypes[0];

  // dropdown predictions
  chartTypes: SelectItem[] = [
    { label: 'Prophet Chart', value: 'prophet' },
    { label: 'LSTM Chart', value: 'lstm' },
    { label: 'GRU Chart', value: 'gru' },
    { label: 'CNN Chart', value: 'cnn' },
  ];
  selectedChartType: SelectItem = this.chartTypes[0];

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

          // Prepare chart data
          this.stockDataChart = {
            labels: this.stockDataKeys.map((key) => key.substring(0, 10)), // Extracting the year from the date string
            datasets: [
              {
                type:'line',
                data: this.stockDataKeys.map((key) => this.stockData[key]['Adj Close']),
                fill: false,
                pointStyle:false
              }
            ]
          };

          // Set chart options
          this.chartOptions = {

            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                label: 'Price',
                enabled: true// <-- this option disables tooltips
              }
              },
            scales: {
              y: {
                beginAtZero: true // Start the y-axis from zero
              }
            },
            responsive: true // Make the chart responsive
          };
        },
        (error) => {
          console.error('Failed to get stock data:', error);
        }
      );
  }
}
