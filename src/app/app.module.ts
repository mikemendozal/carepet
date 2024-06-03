import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingProviders, routing } from './app.rounting';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuloLoginModule } from './modulo-login/modulo-login.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { ModuloMenuModule } from './modulo-menu/modulo-menu.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { ServiceService } from './services/service.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IndexComponent } from './index/index.component';
import { UserAppointmentComponent } from './user-appointment/user-appointment.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ServiciosComponent } from './servicios/servicios.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    IndexComponent,
    UserLoginComponent,
    UserAppointmentComponent,
    TopbarComponent,
    ServiciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModuloMenuModule,
    ModuloLoginModule,
    routing,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [appRoutingProviders,ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
