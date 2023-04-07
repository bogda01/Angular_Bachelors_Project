import { Component } from '@angular/core';
import { Stock } from '../model/stock';

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent {
  stocks: Stock[] = [
    {
      id: 0,
      name: 'Amazon',
      symbol: 'AMZN',
      price: 100,
    },
    {
      id: 1,
      name: 'Apple',
      symbol: 'AAPL',
      price: 90,
    },
    {
      id: 2,
      name: 'Berkshire',
      symbol: 'BRK-B',
      price: 90,
    },
    {
      id: 3,
      name: 'Google',
      symbol: 'GOOGL',
      price: 80,
    },
  ];
}
