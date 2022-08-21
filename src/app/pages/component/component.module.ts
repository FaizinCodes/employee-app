import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';

export const currencyMaskConfigMerchant = {
  align: 'left',
  allowNegative: false,
  allowZero: false,
  decimal: ',',
  precision: 0,
  prefix: '',
  thousands: '.',
  suffix: '',
  nullable: false,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    NgxCurrencyModule.forRoot(currencyMaskConfigMerchant),
    NgxMatSelectSearchModule,
    MatSelectModule
  ],
  exports: [
    HeaderComponent,
    MatDatepickerModule,
    NgxCurrencyModule,
    NgxMatSelectSearchModule,
    MatSelectModule
  ]
})
export class ComponentModule { }
