import { Component } from '@angular/core';
import {PredictionData} from "../../../model/prediction";
import {StockData} from "../../../model/stockData";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {StockService} from "../../../service/stock/stock.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-gru-chart',
  templateUrl: './gru-chart.component.html',
  styleUrls: ['./gru-chart.component.css']
})
export class GruChartComponent {
  ticker = '';
  gruData: PredictionData = {};
  stockData: StockData = {};
  stockDataChart: any;
  chartOptions: any;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.ticker = params.get('ticker')!;
          return this.stockService.getGRUStock(this.ticker);
        })
      )
      .subscribe(
        (gruData: PredictionData) => {
          this.gruData = gruData;

          this.stockService.getStock(this.ticker).subscribe(
            (stockData: StockData) => {
              this.stockData = stockData;

              // Prepare chart data
              const stockDataKeys = Object.keys(this.stockData);
              const gruDataKeys = Object.keys(this.gruData);
              const labels = [...stockDataKeys, ...gruDataKeys].map((key)=>key.substring(0,10));

              const stockDataValues = stockDataKeys.map((key) => this.stockData[key]['Adj Close']);
              const gruDataValues = gruDataKeys.map((key) => this.gruData[key]['Adj Close']);
              const stockDataLength = stockDataValues.length;
              const gruDataAdjusted = Array(stockDataLength).fill(null).concat(gruDataValues);

              this.stockDataChart = {
                labels: labels,
                datasets: [
                  {
                    type: 'line',
                    label: 'Price History',
                    data: stockDataValues,
                    fill: false,
                    pointStyle: false,
                    borderColor: '#007bff' // Set color for stock line
                  },
                  {
                    type: 'line',
                    label: 'GRU Prediction',
                    data: gruDataAdjusted,
                    fill: false,
                    pointStyle: false,
                    borderColor: 'red' // Set color for gru line
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
                    label: 'Price',
                    enabled: true // <-- this option disables tooltips
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
        },
        (error) => {
          console.error('Failed to get GRU stock data:', error);
        }
      );
  }
}
