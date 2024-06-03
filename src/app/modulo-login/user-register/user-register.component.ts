import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { randomInt } from 'crypto';
import { PersonService } from 'src/app/services/person.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interface/user';
import { Admin } from '../../interface/admin';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  @ViewChild('txtCedula') txtCedula!: ElementRef;
  @ViewChild('txtNombre') txtNombre!: ElementRef;
  @ViewChild('txtEdad') txtEdad!: ElementRef;
  @ViewChild('txtTelefono') txtTelefono!: ElementRef;
  @ViewChild('txtEmail') txtEmail!: ElementRef;
  @ViewChild('txtPassword') txtPassword!: ElementRef;
  

  constructor(  private _servicePerson: PersonService,private _serviceUser: UserService) { }

  ngOnInit(): void {
    localStorage.setItem("servicios","0"); 
    localStorage.setItem("productos","0"); 
    localStorage.setItem("citas","0"); 
    localStorage.setItem("citasA","0"); 
  }

  guardarUsuario():void
  {
    const personid=3;
    const personCedula:number = this.txtCedula.nativeElement.value;
    const personName:string = this.txtNombre.nativeElement.value;
    const personAge:number = this.txtEdad.nativeElement.value;
    const personPhone:number = this.txtTelefono.nativeElement.value;
    const userEmail = this.txtEmail.nativeElement.value;
    const userPassword = this.txtPassword.nativeElement.value;
    const adminEmail = this.txtEmail.nativeElement.value;
    const adminPassword = this.txtPassword.nativeElement.value;

    console.log(adminEmail, adminPassword)

    // person_personid: number,
    // userEmail: string,
    // userPassword: string
    var user: User = {personid,personCedula,personPhone,userEmail,userPassword,personName,personAge}
    var admin: Admin ={personid,personAge,personCedula,personName,personPhone,adminEmail,adminPassword}
    if(localStorage.getItem("usuario")=="u"){
      this._serviceUser.saveUser(user.personCedula,user.personPhone,user.userEmail,user.userPassword,user.personName,user.personAge).subscribe((response)=>
      {
        if (response)
        {
          alert('Usuario guardado con exito')

        }else {
          alert('Error')
        }

      });
    }

    if(localStorage.getItem("admin")=="a"){
      this._servicePerson.saveAdmin(admin.personAge,admin.personCedula,admin.personName,admin.personPhone,admin.adminEmail,admin.adminPassword).subscribe((response)=>
      {
        if (response)
        {
          alert('Administrador guardado con exito')

        }else {
          alert('Error')
        }

      });
    }
      
      this.txtCedula.nativeElement.value= "";
      this.txtNombre.nativeElement.value= "";
      this.txtEdad.nativeElement.value= "";
      this.txtEmail.nativeElement.value= "";
      this.txtTelefono.nativeElement.value="";
      this.txtEmail.nativeElement.value="";
      this.txtPassword.nativeElement.value="";
      
  }
}
