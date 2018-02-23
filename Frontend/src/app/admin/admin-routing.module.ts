import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { MapPageComponent } from './map-page/map-page.component';

const adminRoutes: Routes = [
  { 
    path: '',
    component: DashboardPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'users',
    component: UsersPageComponent
  },
  {
    path: 'map',
    component: MapPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
