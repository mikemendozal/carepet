import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  @ViewChild('txtUsuario') txtUsuario!: ElementRef;
  @ViewChild('txtPassword') txtPassword!: ElementRef;
  myImage:string ="assets/img/inicio.jpeg";
  constructor(private _serviceUser: UserService,
    private router:Router) {

   }

  ngOnInit(): void {
    this.inicializar();
  }


  iniciarSesion()
  {
    
   
    const usuario:string = this.txtUsuario.nativeElement.value;
    const password:string = this.txtPassword.nativeElement.value;
 
    
    // userEmail: string,
    // userPassword: string

    var user: User = {
      personid: 0,
      personCedula: 0,
      userEmail: usuario,
      userPassword: password,
      personName: '',
      personAge: 0,
      personPhone: 0,
      
    } 
     this._serviceUser.autenticateUser(user.userEmail, user.userPassword).subscribe((response)=>
      {
       console.log(response[0][0])
        if(response[0][0] >0)
        {
          localStorage.setItem("admin","a");
          localStorage.setItem("ref","1");
          localStorage.setItem("val","0");
          localStorage.setItem("id",response[0][0]);
          localStorage.setItem("rol", response[0][1])
          localStorage.setItem("delevery","0"); 
          this.router.navigate(['/AdminUser']);
        }else
        {
          alert('credenciales incorrectas');
        } 
      });
    
      this.txtUsuario.nativeElement.value="";
      this.txtPassword.nativeElement.value="";
      
  }


  inicializar()
  {
   
    if(localStorage.getItem("ref")==null)
    {
      localStorage.setItem("usuario","u");
      localStorage.setItem("ref", "--")
      location.reload();
     
    }
  
  }

}
