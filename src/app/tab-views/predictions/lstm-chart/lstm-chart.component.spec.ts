import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstmChartComponent } from './lstm-chart.component';

describe('LstmChartComponent', () => {
  let component: LstmChartComponent;
  let fixture: ComponentFixture<LstmChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstmChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LstmChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
