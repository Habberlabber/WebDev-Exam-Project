import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    DashboardPageComponent,
    UsersPageComponent,
  ]
})
export class AdminModule { }
