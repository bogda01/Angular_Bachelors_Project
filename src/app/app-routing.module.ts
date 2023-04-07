import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleStockComponent } from './single-stock/single-stock.component';
import { HomeComponent } from './home/home.component'; // CLI imports router

const routes: Routes = [
  {
    path: 'single-stock',
    component: SingleStockComponent,
  },
  { path: '', component: HomeComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
