import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmaChartComponent } from './sma-chart.component';

describe('SmaChartComponent', () => {
  let component: SmaChartComponent;
  let fixture: ComponentFixture<SmaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmaChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
