import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  { 
    path: 'signup',
    component: SignupPageComponent
  },
  { 
    path: 'signin',
    component: SigninPageComponent
  },
  { 
    path: 'play',
    component: VotePageComponent
  },
  { 
    path: 'bookmarks',
    component: BookmarksPageComponent
  },
  { 
    path: 'settings',
    component: SettingsPageComponent
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    data: { preload: true }
   },
  { 
    path: '',
    redirectTo: '/play',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
