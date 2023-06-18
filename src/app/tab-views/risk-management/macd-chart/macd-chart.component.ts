import { Component } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {StockService} from "../../../service/stock/stock.service";
import {switchMap} from "rxjs/operators";
import {MACDData} from "../../../model/MACD";

@Component({
  selector: 'app-macd-chart',
  templateUrl: './macd-chart.component.html',
  styleUrls: ['./macd-chart.component.css']
})
export class MacdChartComponent {
  ticker = '';
  macdData: MACDData = {};
  macdDataKeys: string[] = [];
  stockDataChart: any;
  chartOptions: any;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.ticker = params.get('ticker')!;
          return this.stockService.getMACDStock(this.ticker);
        })
      )
      .subscribe(
        (data: MACDData) => {
          this.macdData = data;
          this.macdDataKeys = Object.keys(this.macdData);

          // Prepare chart data
          this.stockDataChart = {
            labels: this.macdDataKeys.map((key) => key.substring(0, 10)), // Extracting the date from the timestamp
            datasets: [
              {
                label: 'Signal',
                data: this.macdDataKeys.map((key) => this.macdData[key]['Signal']),
                borderColor: 'red',
                fill: false,
                pointStyle: false
              },
              {
                label: 'MACD',
                data: this.macdDataKeys.map((key) => this.macdData[key]['MACD']),
                borderColor: '#007bff',
                fill: false,
                pointStyle: false
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
                enabled: true
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
          console.error('Failed to get MACD data:', error);
        }
      );
  }
}
