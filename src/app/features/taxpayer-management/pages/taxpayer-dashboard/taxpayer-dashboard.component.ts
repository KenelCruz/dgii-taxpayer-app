import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Taxpayer, TaxpayerReport } from '../../../../core/models';
import { TaxpayerService } from '../../../../core/services/taxpayer.service';
import { TaxReceiptService } from '../../../../core/services/tax-receipt.service';
import { CreateReceiptDialogComponent } from '../../components/create-receipt-dialog-component/create-receipt-dialog-component.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-taxpayer-dashboard',
  templateUrl: './taxpayer-dashboard.component.html',
  styleUrls: ['./taxpayer-dashboard.component.scss']
})
export class TaxpayerDashboardComponent implements OnInit {
  taxpayers: Taxpayer[] = [];
  selectedTaxpayerReport: TaxpayerReport | null = null;

  loading = false;
  loadingDetail = false;
  error: string | null = null;

  constructor(
    private taxpayerService: TaxpayerService,
    private taxReceiptService: TaxReceiptService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTaxpayers();
  }


  loadTaxpayers(): void {
    this.loading = true;
    this.error = null;

    this.taxpayerService.getAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.taxpayers = data;
          console.log('✓ Contribuyentes cargados:', data);
        },
        error: (err) => {
          this.error = err.message || 'Error al cargar contribuyentes';
          console.error('❌ Error cargando contribuyentes:', err);
        }
      });
  }


  onTaxpayerSelected(rncCedula: string): void {
    this.loadingDetail = true;
    this.error = null;

    // Buscar el contribuyente para obtener su nombre
    const taxpayer = this.taxpayers.find(t => t.rncCedula === rncCedula);
    const taxpayerName = taxpayer?.nombre || 'Contribuyente';

    console.log(`🔍 Buscando comprobantes para: ${taxpayerName} (${rncCedula})`);

    this.taxReceiptService.getTaxpayerReport(rncCedula, taxpayerName)
      .pipe(finalize(() => this.loadingDetail = false))
      .subscribe({
        next: (report) => {
          console.log('✓ Reporte recibido:', report);
          this.selectedTaxpayerReport = report;
          // Scroll al detalle
          setTimeout(() => {
            this.scrollToDetail();
          }, 100);
        },
        error: (err) => {
          this.error = err.message || 'Error al cargar el reporte';
          console.error('❌ Error cargando reporte:', err);
        }
      });
  }


  /**
   * Abre el diálogo para crear un nuevo comprobante
   */
  openCreateReceiptDialog(): void {
    if (!this.selectedTaxpayerReport) {
      console.warn('⚠️ No hay contribuyente seleccionado');
      return;
    }

    const dialogRef = this.dialog.open(CreateReceiptDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      disableClose: false,
      data: {
        rncCedula: this.selectedTaxpayerReport.rncCedula,
        taxpayerName: this.selectedTaxpayerReport.Name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se creó un comprobante, recargar el reporte
        console.log('✅ Comprobante creado, recargando reporte...');
        this.onTaxpayerSelected(this.selectedTaxpayerReport!.rncCedula);
      }
    });
  }


  onCloseDetail(): void {
    this.selectedTaxpayerReport = null;
  }


  private scrollToDetail(): void {
    const detailElement = document.querySelector('.detail-section');
    if (detailElement) {
      detailElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}