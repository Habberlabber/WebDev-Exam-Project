import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ApiSettings } from './api-services/api-settings';

import { AppComponent } from './app.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { VoteCardComponent } from './pages/vote-page/vote-card/vote-card.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { SettingsFormComponent } from './pages/settings-page/settings-form/settings-form.component';
import { ImageUploadComponent } from './pages/settings-page/image-upload/image-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    VotePageComponent,
    SigninPageComponent,
    VoteCardComponent,
    BookmarksPageComponent,
    SettingsPageComponent,
    SettingsFormComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LeafletModule.forRoot(),
    HttpClientModule
  ],
  providers: [ApiSettings],
  bootstrap: [AppComponent]
})
export class AppModule { }
