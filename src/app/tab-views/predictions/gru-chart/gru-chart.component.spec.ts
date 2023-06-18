import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruChartComponent } from './gru-chart.component';

describe('GruChartComponent', () => {
  let component: GruChartComponent;
  let fixture: ComponentFixture<GruChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
