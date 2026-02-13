import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaxpayerReport, TaxReceipt } from '../../../../core/models';
import { CreateReceiptDialogComponent } from '../create-receipt-dialog-component/create-receipt-dialog-component.component';

@Component({
  selector: 'app-taxpayer-detail',
  templateUrl: './taxpayer-detail.component.html',
  styleUrls: ['./taxpayer-detail.component.scss']
})
export class TaxpayerDetailComponent {
  @Input() taxpayerReport: TaxpayerReport | null = null;
  @Output() closeDetail = new EventEmitter<void>();
  @Output() createReceipt = new EventEmitter<TaxReceipt>();

  constructor(private dialog: MatDialog) {}

  onClose(): void {
    this.closeDetail.emit();
  }

  onCreateReceipt(): void {
    if (!this.taxpayerReport) return;

    const dialogRef = this.dialog.open(CreateReceiptDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: { rncCedula: this.taxpayerReport.rncCedula },
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El resultado es el TaxReceipt creado
        this.createReceipt.emit(result);
      }
    });
  }
}