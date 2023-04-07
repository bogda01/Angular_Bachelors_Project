import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStockComponent } from './single-stock.component';

describe('SingleStockComponent', () => {
  let component: SingleStockComponent;
  let fixture: ComponentFixture<SingleStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
