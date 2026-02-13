import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReceiptDialogComponentComponent } from './create-receipt-dialog-component.component';

describe('CreateReceiptDialogComponentComponent', () => {
  let component: CreateReceiptDialogComponentComponent;
  let fixture: ComponentFixture<CreateReceiptDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReceiptDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReceiptDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
