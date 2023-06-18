import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnnChartComponent } from './cnn-chart.component';

describe('CnnChartComponent', () => {
  let component: CnnChartComponent;
  let fixture: ComponentFixture<CnnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnnChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
