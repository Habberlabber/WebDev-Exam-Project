import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { EditFormComponent } from './users-page/edit-form/edit-form.component';
import { CreateFormComponent } from './users-page/create-form/create-form.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardPageComponent,
    UsersPageComponent,
    EditFormComponent,
    CreateFormComponent,
  ]
})
export class AdminModule { }
