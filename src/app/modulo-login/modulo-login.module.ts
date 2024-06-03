import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminUserComponent,
    UserRegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
   exports: [ UserRegisterComponent]
})
export class ModuloLoginModule { }
