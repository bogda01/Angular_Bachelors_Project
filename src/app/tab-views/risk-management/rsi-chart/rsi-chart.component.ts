import { Component } from '@angular/core';
import {RSIData} from "../../../model/RSI";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { StockService } from "../../../service/stock/stock.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-rsi-chart',
  templateUrl: './rsi-chart.component.html',
  styleUrls: ['./rsi-chart.component.css']
})
export class RsiChartComponent {
  ticker = '';
  rsiData: RSIData = {};
  rsiDataKeys: string[] = [];
  stockDataChart: any;
  chartOptions: any;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.ticker = params.get('ticker')!;
          return this.stockService.getRSIStock(this.ticker);
        })
      )
      .subscribe(
        (data: RSIData) => {
          this.rsiData = data;
          this.rsiDataKeys = Object.keys(this.rsiData);

          // Prepare chart data
          this.stockDataChart = {
            labels: this.rsiDataKeys.map((key) => key.substring(0, 10)), // Extracting the date from the timestamp
            datasets: [
              {
                label: 'RSI',
                data: this.rsiDataKeys.map((key) => this.rsiData[key]['RSI']),
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
          console.error('Failed to get RSI data:', error);
        }
      );
  }
}
