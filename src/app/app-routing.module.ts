import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StockDetailComponent} from "./stock-detail/stock-detail.component";

const routes: Routes = [
  { path: 'stock/:ticker', component: StockDetailComponent },
  { path: '**', redirectTo: '/' },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
