export interface Taxpayer {
  rncCedula: string;
  nombre: string;  
  tipo: string;
  estatus: string;
}


export type TaxpayerType = 'PERSONA FISICA' | 'PERSONA JURIDICA';
export type TaxpayerStatus = 'activo' | 'inactivo';