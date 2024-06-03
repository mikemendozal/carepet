import { Injectable } from '@angular/core';
import {  Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { global } from './global.service';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;

 
  private _servicesUser: User[] = [];
  private _userid: number[] = [];

  constructor(

    private _http: HttpClient
  ) { 

    this.url = global.url;
  }


  get getUser(): User[]
  {
    return [...this._servicesUser];
  }

  set setUser(product: User)
  {
    this._servicesUser.push(product);
  }

  get getUserSession(): number[]
  {
    return [...this._userid];
  }

  set setUserSession(userid: number)
  {
    this._userid.push(userid);
  }
  //METODO PARA VALIDAR SESION DEL USUARIO
  public autenticateUser(userEmail: string, userPassword: string ) :Observable<any>
  {
    return this._http.post(this.url+'autenticateUser',{userEmail,userPassword });
  }


  //METODOS PARA EL CRUD DE SERVICE

  public searchUser(id:number):Observable<any>
  {
    return this._http.get(this.url+'readUser/'+ id);
  }

  public removeUser(userid: string): Observable<any>
  {
    return this._http.delete(this.url+'deleteUser/'+userid);
  }

  public updateUser(personId:number,personCedula:number, personPhone:number, userEmail:string, userPassword: string , personName:string, personAge:number): Observable<any>
  {
    return this._http.put(this.url+'updateUser/'+personId,{personId,personCedula, personPhone, userEmail, userPassword , personName, personAge});
  }

  
  public listUser(): Observable<any>
  {
    return this._http.get(this.url+'listUser');
  }



  public saveUser(personCedula:number, personPhone:number, userEmail:string, userPassword: string, personName:string, personAge:number ): Observable<any>
  {
    return this._http.post(this.url+'registerUser',{personCedula, personPhone, userEmail, userPassword, personName, personAge});
  }
}
