import { NgModule } from '@angular/core';
import { NgLoadingBarModule } from 'ng-loading-bar';
import { ExportModules } from '../shared/export.modules';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ExportModules,
    NgLoadingBarModule.forRoot()],
  declarations: [DashboardComponent],
  providers: [NgLoadingBarModule],
})
export class DashboardModule { }
