import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

import { AuthGuardService as AuthGuard } from './auth-guard.service';

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
    component: VotePageComponent, 
    canActivate: [AuthGuard], 
    data: { 
      user_type: 0
    } 
  },
  { 
    path: 'bookmarks',
    component: BookmarksPageComponent, 
    canActivate: [AuthGuard], 
    data: { 
      user_type: 2
    } 
  },
  { 
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [AuthGuard], 
    data: { 
      user_type: 0
    } 
  },
  {
    path: 'chat',
    component: ChatPageComponent,
    canActivate: [AuthGuard], 
    data: { 
      user_type: 1
    } 
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard], 
    data: { preload: true, user_type: 3 }
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
