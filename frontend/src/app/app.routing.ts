import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard.service';

import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'checkout',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: { title: 'Checkot' },
    children: [
      {
        path: 'checkout',
        loadChildren: './checkout/checkout.module#CheckModule',
      }
    ]
  },
  {
    path: 'dashboard',
    component: FullLayoutComponent,
    data: { title: 'dashboard' },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'discounts',
        loadChildren: './discounts/discounts.module#DiscountsModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],

})
export class AppRoutingModule { }
