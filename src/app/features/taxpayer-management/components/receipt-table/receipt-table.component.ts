import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaxReceipt } from '../../../../core/models';

@Component({
  selector: 'app-receipt-table',
  templateUrl: './receipt-table.component.html',
  styleUrls: ['./receipt-table.component.scss']
})
export class ReceiptTableComponent implements OnInit, OnChanges {
  @Input() receipts: TaxReceipt[] = [];

  displayedColumns: string[] = ['NCF', 'Amount', 'Itbis'];

  ngOnInit(): void {
    console.log('🚀 ReceiptTableComponent iniciado');
    console.log('📋 Receipts en ngOnInit:', this.receipts);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receipts']) {
      console.log('🔄 Cambio detectado en receipts');
      console.log('  - Valor anterior:', changes['receipts'].previousValue);
      console.log('  - Valor nuevo:', changes['receipts'].currentValue);
      console.log('📋 Receipts recibidos en tabla:', this.receipts);
      console.log('📊 Cantidad de comprobantes:', this.receipts?.length || 0);

      // Verificar cada comprobante
      if (this.receipts && this.receipts.length > 0) {
        this.receipts.forEach((r, i) => {
          console.log(`  [${i}] NCF: ${r.NCF}, Amount: ${r.Amount}, ITBIS: ${r.Itbis}`);
        });
      }
    }
  }

  get hasReceipts(): boolean {
    const result = this.receipts && this.receipts.length > 0;
    console.log('❓ hasReceipts:', result, '(length:', this.receipts?.length, ')');
    return result;
  }
}