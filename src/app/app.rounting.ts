import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from "./modulo-login/user-register/user-register.component";
import { AdminUserComponent } from "./modulo-login/admin-user/admin-user.component";
import { AdminProductComponent } from "./modulo-menu/admin-product/admin-product.component";
import { AdminServiceComponent } from "./modulo-menu/admin-service/admin-service.component";
import { DeleveryComponent } from "./modulo-menu/delevery/delevery.component";
import { UserServiceComponent } from "./modulo-menu/user-service/user-service.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { IndexComponent }  from "./index/index.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AdminPetComponent } from "./modulo-menu/admin-pet/admin-pet.component";
import { UserAppointmentComponent } from "./user-appointment/user-appointment.component";
import { EstadoMascotaComponent } from "./modulo-menu/estado-mascota/estado-mascota.component";
import { AutorizarCitaComponent } from "./modulo-menu/autorizar-cita/autorizar-cita.component";
import { EstadoCitaComponent } from "./modulo-menu/estado-cita/estado-cita.component";
import {TopvendidosComponent} from "./modulo-menu/topvendidos/topvendidos.component";
import {ServiciosComponent} from "./servicios/servicios.component";


const appRoutes: Routes =
[
{path:'', component:UserLoginComponent},
{path:'login', component:UserLoginComponent},
{path:'registerUser', component:UserRegisterComponent},
{path:'AdminService', component:AdminServiceComponent},
{path:'AdminProduct', component:AdminProductComponent},
{path:'AdminUser', component:AdminUserComponent},
{path:'Delivery', component:DeleveryComponent},
{path:'UserService', component:UserServiceComponent},
{path:'adminAppointment', component:UserAppointmentComponent},
{path:'EstadoMascota', component:EstadoMascotaComponent},
{path:'index', component:IndexComponent},
{path:'menu', component:SidebarComponent},
{path:'pet', component:AdminPetComponent},
{path:'AutorizarCita', component:AutorizarCitaComponent},
{path:'EstadoCita', component:EstadoCitaComponent},
{path:'TopVendidos', component:TopvendidosComponent},
{path:'Servicios', component:ServiciosComponent}
];


export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);