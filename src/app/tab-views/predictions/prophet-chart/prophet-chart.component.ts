import { Component } from '@angular/core';
import {PredictionData} from "../../../model/prediction";
import {StockData} from "../../../model/stockData";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {StockService} from "../../../service/stock/stock.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-prophet-chart',
  templateUrl: './prophet-chart.component.html',
  styleUrls: ['./prophet-chart.component.css']
})
export class ProphetChartComponent {
  ticker = '';
  prophetData: PredictionData = {};
  stockData: StockData = {};
  stockDataChart: any;
  chartOptions: any;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.ticker = params.get('ticker')!;
          return this.stockService.getProphetStock(this.ticker);
        })
      )
      .subscribe(
        (prophetData: PredictionData) => {
          this.prophetData = prophetData;

          this.stockService.getStock(this.ticker).subscribe(
            (stockData: StockData) => {
              this.stockData = stockData;

              // Prepare chart data
              const prophetDataKeys = Object.keys(this.prophetData);
              const labels = prophetDataKeys.map((key)=>key.substring(0,4));

              const stockDataValues = prophetDataKeys.map((key) => this.stockData[key] ? this.stockData[key]['Adj Close'] : null);
              const prophetDataValues = prophetDataKeys.map((key) => this.prophetData[key]['Adj Close']);

              this.stockDataChart = {
                labels: labels,
                datasets: [
                  {
                    type: 'line',
                    label: 'Price History',
                    data: stockDataValues,
                    fill: false,
                    pointStyle: false,
                    borderColor: 'blue' // Set color for stock line
                  },
                  {
                    type: 'line',
                    label: 'Prophet Prediction',
                    data: prophetDataValues,
                    fill: false,
                    pointStyle: false,
                    borderColor: 'red' // Set color for Prophet line
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
          console.error('Failed to get Prophet stock data:', error);
        }
      );
  }
}

