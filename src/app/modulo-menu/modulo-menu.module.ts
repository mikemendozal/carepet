import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminServiceComponent } from './admin-service/admin-service.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { DeleveryComponent } from './delevery/delevery.component';
import { UserServiceComponent } from './user-service/user-service.component';
import { FormsModule } from '@angular/forms';
import { AdminPetComponent } from './admin-pet/admin-pet.component';
import { EstadoMascotaComponent } from './estado-mascota/estado-mascota.component';
import { EstadoCitaComponent } from './estado-cita/estado-cita.component';
import { AutorizarCitaComponent } from './autorizar-cita/autorizar-cita.component';
import { TopvendidosComponent } from './topvendidos/topvendidos.component';


@NgModule({
  declarations: [
    AdminServiceComponent,
    AdminProductComponent,
    DeleveryComponent,
    UserServiceComponent,
    AdminPetComponent,
    EstadoMascotaComponent,
    EstadoCitaComponent,
    AutorizarCitaComponent,
    TopvendidosComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
   exports: [
    AdminServiceComponent,
    AdminPetComponent,
    EstadoMascotaComponent,
    AutorizarCitaComponent,
    TopvendidosComponent
   ]
})
export class ModuloMenuModule { }
