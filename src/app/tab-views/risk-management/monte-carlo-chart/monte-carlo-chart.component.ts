import { Component } from '@angular/core';
import {MonteCarloData} from "../../../model/MonteCarlo";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { StockService } from "../../../service/stock/stock.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-monte-carlo-chart',
  templateUrl: './monte-carlo-chart.component.html',
  styleUrls: ['./monte-carlo-chart.component.css']
})
export class MonteCarloChartComponent {
  ticker = '';
  monteCarloData: MonteCarloData = {};
  stockDataChart: any;
  chartOptions: any;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.ticker = params.get('ticker')!;
          return this.stockService.getMonteCarloStock(this.ticker);
        })
      )
      .subscribe(
        (data: MonteCarloData) => {
          this.monteCarloData = data;
          const labels = Array.from({ length: 366 }, (_, index) => index);

          // Prepare chart data
          this.stockDataChart = {
            labels: labels, // Create an index array
            datasets: [
              {
                label: 'Max Value',
                data: this.monteCarloData['Max Value'],
                borderColor: '#5da0e3',
                fill: false,
                pointStyle: false
              },
              {
                label: 'Min Value',
                data: this.monteCarloData['Min Value'],
                borderColor: 'red',
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
          console.error('Failed to get Monte Carlo data:', error);
        }
      );
  }
}
