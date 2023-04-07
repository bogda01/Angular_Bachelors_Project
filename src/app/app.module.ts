import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ChartComponent } from './chart/chart.component';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { Chart2Component } from './chart2/chart2.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TableModule } from 'primeng/table';
import { SingleStockComponent } from './single-stock/single-stock.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterLink } from '@angular/router';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    Chart2Component,
    PortfolioComponent,
    SingleStockComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ChartModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    RippleModule,
    FormsModule,
    TabViewModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    AppRoutingModule,
    RouterLink,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
