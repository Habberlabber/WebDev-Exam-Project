import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { MapPageComponent } from './map-page/map-page.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    LeafletModule
  ],
  declarations: [
    DashboardPageComponent,
    UsersPageComponent,
    MapPageComponent,
  ]
})
export class AdminModule { }
