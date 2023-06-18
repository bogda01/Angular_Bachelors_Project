import { Component, OnInit } from '@angular/core';
import {TickerService} from "../service/ticker/ticker.service";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  stocks: string[] = [];

  constructor(private tickerService: TickerService) { }

  ngOnInit(): void {
    this.tickerService.getTickers().then((data: any) => {
      this.stocks = this.getRandomStocks(data, 4);
    }).catch((error: Error) => {
      console.error(error);
    });
  }

  getRandomStocks(data: string[], count: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const removedItems = data.splice(randomIndex, 1);  // This also prevents duplicates
      result.push(removedItems[0]);
    }
    return result;
  }
}
