import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { VoteCardComponent } from './pages/vote-page/vote-card/vote-card.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    VotePageComponent,
    SigninPageComponent,
    VoteCardComponent,
    BookmarksPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
