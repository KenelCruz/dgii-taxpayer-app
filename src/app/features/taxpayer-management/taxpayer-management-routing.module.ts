import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxpayerDashboardComponent } from './pages/taxpayer-dashboard/taxpayer-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: TaxpayerDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxpayerManagementRoutingModule { }
