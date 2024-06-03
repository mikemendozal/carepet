import { Injectable } from '@angular/core';
import {  Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { global } from './global.service';
import { AppoIntment } from '../interface/appoIntment';
import { Pet } from '../interface/pet';
import { Service } from '../interface/service';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public url: string;

 
  private _appointmentService: AppoIntment[] = [];
  private _appointmentid: number[] = [];

  constructor(

    private _http: HttpClient
  ) { 

    this.url = global.url;
  }


  get getAppointment(): AppoIntment[]
  {
    return [...this._appointmentService];
  }

  set setAppointment(product: AppoIntment)
  {
    this._appointmentService.push(product);
  }

  get getAppointmentSession(): number[]
  {
    return [...this._appointmentid];
  }

  set setAppointmentSession(userid: number)
  {
    this._appointmentid.push(userid);
  }

  //METODOS PARA EL CRUD DE SERVICE

  public searchAppointment(id:number):Observable<any>
  {
    return this._http.get(this.url+'readAppointment/'+ id);
  }

  public removeAppointment(appointmentId: number): Observable<any>
  {
    return this._http.delete(this.url+'deleteAppointment/'+appointmentId);
  }

  public updateAppointment(user:number , service:Service, pet: Pet, appointmentId:number): Observable<any>
  {
    return this._http.put(this.url+'updateAppointment/'+appointmentId,{user, service, pet, appointmentId});
  }

  
  public listAppointment(): Observable<any>
  {
    return this._http.get(this.url+'listAppointment');
  }



  public saveAppointment(user:User , service:Service, pet: Pet, appointmentDate: Date): Observable<any>
  {
    console.log(user, pet,service, appointmentDate )
    return this._http.post(this.url+'registerAppointment',{pet, service, user,appointmentDate});
  }

  public estadoCita(id: number, appointmentStatus: boolean): Observable<any>
  {
    return this._http.patch(this.url+'updateStatus/'+id, appointmentStatus);
  }


  public listarCitasUser(id: number): Observable<any>
  {
    return this._http.get(this.url+'appointmentStateQuery/'+ id);
  }

  
}
