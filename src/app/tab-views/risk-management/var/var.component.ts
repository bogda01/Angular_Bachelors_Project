import { Component, OnInit } from '@angular/core';
import {VARData} from "../../../model/VAR";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StockService } from '../../../service/stock/stock.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-var',
  templateUrl: './var.component.html',
  styleUrls: ['./var.component.css']
})
export class VarComponent implements OnInit {
  ticker = '';
  varData: VARData = {};

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.ticker = params.get('ticker')!;
          return this.stockService.getVARStock(this.ticker);
        })
      )
      .subscribe(
        (data: VARData) => {
          this.varData = data;
        },
        (error) => {
          console.error('Failed to get VAR data:', error);
        }
      );
  }
}
