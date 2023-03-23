import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart2Component } from './chart2.component';

describe('Chart2Component', () => {
  let component: Chart2Component;
  let fixture: ComponentFixture<Chart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chart2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
