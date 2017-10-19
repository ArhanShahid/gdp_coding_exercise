import { NgModule } from '@angular/core';
import { NgLoadingBarModule } from 'ng-loading-bar';
import { ExportModules } from '../shared/export.modules';

import { CheckoutService } from '../services/checkout.service';

import { GroupByPipe } from '../pipes/groupby';

import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';


@NgModule({
  imports: [
    CheckoutRoutingModule,
    ExportModules,
    NgLoadingBarModule.forRoot()],
  declarations: [CheckoutComponent, GroupByPipe],
  providers: [NgLoadingBarModule, CheckoutService],
})
export class CheckModule { }
