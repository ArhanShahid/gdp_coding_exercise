import { NgModule } from '@angular/core';
import { NgLoadingBarModule } from 'ng-loading-bar';
import { ExportModules } from '../shared/export.modules';

import { OrderByPipe } from '../pipes/orderby';

import { DiscountsComponent } from './discounts.component';
import { DiscountsRoutingModule } from './discounts-routing.module';


@NgModule({
  imports: [
    DiscountsRoutingModule,
    ExportModules,
    NgLoadingBarModule.forRoot()],
  declarations: [DiscountsComponent, OrderByPipe],
  providers: [NgLoadingBarModule],
})
export class DiscountsModule { }
