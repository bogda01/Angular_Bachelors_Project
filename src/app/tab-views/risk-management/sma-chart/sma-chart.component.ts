import { Component } from '@angular/core';
import {StockData} from "../../../model/stockData";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {StockService} from "../../../service/stock/stock.service";
import {SMAData} from "../../../model/SMA";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-sma-chart',
  templateUrl: './sma-chart.component.html',
  styleUrls: ['./sma-chart.component.css']
})
export class SmaChartComponent {

  ticker = '';
  smaData: SMAData = {};
  stockData: StockData = {};
  stockDataChart: any;
  chartOptions: any;

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
        (stockData: StockData) => {
          this.stockData = stockData;

          this.stockService.getSMAStock(this.ticker).subscribe(
            (smaData: SMAData) => {

              // Prepare chart data
              const smaDataKeys = Object.keys(smaData);
              const labels = smaDataKeys.map((key) => key.substring(0, 10));

              const stockDataValues = smaDataKeys.map((key) => this.stockData[key] ? this.stockData[key]['Adj Close'] : null);
              const sma30Values = smaDataKeys.map((key) => smaData[key]['SMA_30']);
              const sma100Values = smaDataKeys.map((key) => smaData[key]['SMA_100']);

              this.stockDataChart = {
                labels: labels,
                datasets: [
                  {
                    type: 'line',
                    label: 'SMA_30',
                    data: sma30Values,
                    pointStyle: false,
                    fill: false,
                    borderColor: 'red' // Set color for SMA_30 line
                  },
                  {
                    type: 'line',
                    label: 'SMA_100',
                    data: sma100Values,
                    pointStyle: false,
                    fill: false,
                    borderColor: '#45eb09' // Set color for SMA_100 line
                  },
                  {
                    type: 'line',
                    label: 'Price History',
                    data: stockDataValues,
                    pointStyle: false,
                    fill: false,
                    borderColor: '#007bff' // Set color for stock line
                  }
                ]
              };

              // Set chart options
              this.chartOptions = {
                plugins: {
                  legend: {
                    display: true
                  },
                  tooltip: {
                    enabled: true // Enable tooltips
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
              console.error('Failed to get SMA data:', error);
            }
          );
        },
        (error) => {
          console.error('Failed to get stock data:', error);
        }
      );
  }

}
