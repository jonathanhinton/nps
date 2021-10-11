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
import { AuthService } from './shared/auth.service';
import { FilterPipe } from './shared/filter.pipe';
import { ParkDetailComponent } from './park-detail/park-detail.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MenuComponent } from './menu/menu.component';
import { ValidateEqualModule } from 'ng-validate-equal';

@NgModule({
  declarations: [
    AppComponent,
    ParkListComponent,
    ParkComponent,
    ProfileComponent,
    FilterPipe,
    ParkDetailComponent,
    LoginComponent,
    CreateAccountComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ValidateEqualModule
  ],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
