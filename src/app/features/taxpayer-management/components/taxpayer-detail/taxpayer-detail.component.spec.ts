import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerDetailComponent } from './taxpayer-detail.component';

describe('TaxpayerDetailComponent', () => {
  let component: TaxpayerDetailComponent;
  let fixture: ComponentFixture<TaxpayerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxpayerDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxpayerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
