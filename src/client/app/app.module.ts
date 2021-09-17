import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParkListComponent } from './park-list/park-list.component';
import { ParkComponent } from './park/park.component';
import { ProfileComponent } from './profile/profile.component';
import { ApiService } from './shared/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ParkListComponent,
    ParkComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
