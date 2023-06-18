import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { RouterLink } from '@angular/router';
import { SearchComponent } from './search/search.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { HomeComponent } from './home/home.component';
import { LstmChartComponent } from './tab-views/predictions/lstm-chart/lstm-chart.component';
import { CnnChartComponent } from './tab-views/predictions/cnn-chart/cnn-chart.component';
import { GruChartComponent } from './tab-views/predictions/gru-chart/gru-chart.component';
import { ProphetChartComponent } from './tab-views/predictions/prophet-chart/prophet-chart.component';
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    StockDetailComponent,
    HomeComponent,
    LstmChartComponent,
    CnnChartComponent,
    GruChartComponent,
    ProphetChartComponent,
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
        AutoCompleteModule,
        DropdownModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
