import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonteCarloChartComponent } from './monte-carlo-chart.component';

describe('MonteCarloChartComponent', () => {
  let component: MonteCarloChartComponent;
  let fixture: ComponentFixture<MonteCarloChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonteCarloChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonteCarloChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
