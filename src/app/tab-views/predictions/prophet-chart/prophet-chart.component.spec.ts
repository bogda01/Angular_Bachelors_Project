import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProphetChartComponent } from './prophet-chart.component';

describe('ProphetChartComponent', () => {
  let component: ProphetChartComponent;
  let fixture: ComponentFixture<ProphetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProphetChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProphetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
