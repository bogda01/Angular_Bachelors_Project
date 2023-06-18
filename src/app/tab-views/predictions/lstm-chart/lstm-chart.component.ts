import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { StockService } from "../../../service/stock/stock.service";
import { PredictionData } from "../../../model/prediction";
import { StockData } from "../../../model/stockData";

@Component({
  selector: 'app-lstm-chart',
  templateUrl: './lstm-chart.component.html',
  styleUrls: ['./lstm-chart.component.css']
})
export class LstmChartComponent implements OnInit {
  ticker = '';
  lstmData: PredictionData = {};
  stockData: StockData = {};
  stockDataChart: any;
  chartOptions: any;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.ticker = params.get('ticker')!;
          return this.stockService.getLSTMStock(this.ticker);
        })
      )
      .subscribe(
        (lstmData: PredictionData) => {
          this.lstmData = lstmData;

          this.stockService.getStock(this.ticker).subscribe(
            (stockData: StockData) => {
              this.stockData = stockData;

              // Prepare chart data
              const stockDataKeys = Object.keys(this.stockData);
              const lstmDataKeys = Object.keys(this.lstmData);
              const labels = [...stockDataKeys, ...lstmDataKeys].map((key)=>key.substring(0,10));

              const stockDataValues = stockDataKeys.map((key) => this.stockData[key]['Adj Close']);
              const lstmDataValues = lstmDataKeys.map((key) => this.lstmData[key]['Adj Close']);
              const stockDataLength = stockDataValues.length;
              const lstmDataAdjusted = Array(stockDataLength).fill(null).concat(lstmDataValues);

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
                    label: 'LSTM Prediction',
                    data: lstmDataAdjusted,
                    fill: false,
                    pointStyle: false,
                    borderColor: 'red' // Set color for LSTM line
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
          console.error('Failed to get LSTM stock data:', error);
        }
      );
  }
}
