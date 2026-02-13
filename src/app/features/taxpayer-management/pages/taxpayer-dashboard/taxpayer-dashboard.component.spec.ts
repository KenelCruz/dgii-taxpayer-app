import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerDashboardComponent } from './taxpayer-dashboard.component';

describe('TaxpayerDashboardComponent', () => {
  let component: TaxpayerDashboardComponent;
  let fixture: ComponentFixture<TaxpayerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxpayerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxpayerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
