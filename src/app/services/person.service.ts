import { Injectable } from '@angular/core';
import {  Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { global } from './global.service';
import { Person } from '../interface/person';

@Injectable({
    providedIn: 'root'
  })
  export class PersonService {

    public url: string;
    private _userid: number[] = [];

 
  private _servicesPerson: Person[] = [];


  constructor(

    private _http: HttpClient
  ) { 

    this.url = global.url;
  }

  get getPerson(): Person[]
  {
    return [...this._servicesPerson];
  }

  set setPerson(product: Person)
  {
    this._servicesPerson.push(product);
  }

  get getPersonSession(): number[]
  {
    return [...this._userid];
  }
  
  public searchAdmin(id:number):Observable<any>
  {
    return this._http.get(this.url+'readAdmin/'+ id);
  }

  public saveAdmin(personAge:number, personCedula:number, personName:string, personPhone:number, adminEmail:string, adminPassword: string): Observable<any>
  {
    return this._http.post(this.url+'registerAdmin',{personCedula, personAge, personName, personPhone, adminEmail, adminPassword});
  }


  public updateAdmin(personId:number,personCedula:number, personPhone:number, adminEmail:string, adminPassword: string , personName:string, personAge:number): Observable<any>
  {
    return this._http.put(this.url+'updateAdmin/'+personId,{personId,personCedula, personPhone, adminEmail, adminPassword , personName, personAge});
  }
}