import { ResourceLoader } from '@angular/compiler';
import { Component, ElementRef,OnInit, Renderer2, ViewChild, ɵɵqueryRefresh } from '@angular/core';
import { request } from 'http';
import { User } from 'src/app/interface/user';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import { Service } from '../../interface/service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  @ViewChild('txtid') txtid!: ElementRef;
  @ViewChild('txtCedula') txtCedula!: ElementRef;
  @ViewChild('txtNombre') txtNombre!: ElementRef;
  @ViewChild('txtEdad') txtEdad!: ElementRef;
  @ViewChild('txtTelefono') txtTelefono!: ElementRef;
  @ViewChild('txtEmail') txtEmail!: ElementRef;
  @ViewChild('txtPassword') txtPassword!: ElementRef;
  
  public userSession : number = 0;
  constructor(  private _serviceUser: UserService,
    private _route : ActivatedRoute) {
       //this. userSession = +this._route.snapshot.paramMap.get('id')! ;
     }

  ngOnInit(): void {
    this.inicializar()
    this.buscarUsuario();
    localStorage.removeItem("usuario");
    localStorage.setItem("delevery","0"); 
    localStorage.setItem("servicios","0"); 
    localStorage.setItem("productos","0"); 
    localStorage.setItem("citas","0"); 
    localStorage.setItem("citasA","0"); 
  }
  get userId()
  {
    return this._serviceUser.getUserSession;
   
  } 


  buscarUsuario()
  {
    console.log(this.userSession);
    var valor: any = localStorage.getItem("id");
    this._serviceUser.searchUser(valor).subscribe((response)=>
    {
        let user : User={
          personid: response['personId'],
          personCedula: response ['personCedula'],
          personPhone: response['personPhone'],
          userEmail: response['userEmail'],
          userPassword: response['userPassword'],
          personName: response['personName'],
          personAge: response['personAge']
        }
        this.txtid.nativeElement.value = user.personid;
        this.txtCedula.nativeElement.value = user.personCedula;
         this.txtNombre.nativeElement.value = user.personName;
          this.txtEdad.nativeElement.value = user.personAge;
          this.txtTelefono.nativeElement.value = user.personPhone;
         this.txtEmail.nativeElement.value = user.userEmail;
         this.txtPassword.nativeElement.value = user.userPassword;
        

    });
  }

  ActualizarUsuario():void
  {
    const cedula:number = this.txtCedula.nativeElement.value;
    const nombre:string = this.txtNombre.nativeElement.value;
    const edad:number = this.txtEdad.nativeElement.value;
    const telefono:number = this.txtTelefono.nativeElement.value;
    const email = this.txtEmail.nativeElement.value;
    const password = this.txtPassword.nativeElement.value;
    const id = this.txtid.nativeElement.value;
    // person_personid: number,
    // userEmail: string,
    // userPassword: string
    var user: User={
      personid: id,
      personCedula: cedula,
      personPhone: telefono,
      userEmail: email,
      userPassword: password,
      personName: nombre,
      personAge: edad,
    }

      this._serviceUser.updateUser(user.personid,user.personCedula, user.personPhone, user.userEmail, user.userPassword, user.personName, user.personAge).subscribe((response)=>
      {
        if(response != null && response != undefined)
        {
          alert('perfil  actualizado con exito');
        }
        else 
        {
          alert('ERROR')
        }
        location.reload()

      });

      this.txtCedula.nativeElement.value= "";
      this.txtNombre.nativeElement.value= "";
      this.txtEmail.nativeElement.value= "";
      this.txtTelefono.nativeElement.value="";
      this.txtEmail.nativeElement.value="";
      this.txtPassword.nativeElement.value="";
      
  }


inicializar()
  {
    if(localStorage.getItem("val")=='0')
    {
      
      localStorage.setItem("val","-1");
      location.reload();
     
    }
  
  }
}
