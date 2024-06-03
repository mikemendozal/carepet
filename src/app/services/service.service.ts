import { Injectable } from '@angular/core';
import {  Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { global } from './global.service';
import { Service } from '../interface/service';
import { Product } from '../interface/product';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  public url: string;

  private _services: Service[] = [];


  constructor(

    private _http: HttpClient
  ) { 

    this.url = global.url;
  }


  get getService(): Service[]
  {
    return [...this._services];
  }

 
  set setService(service: Service)
  {
    this._services.push(service);
  }

  //METODOS PARA EL CRUD DE SERVICE

  public searchService(filtro:string):Observable<any>
  {
    return this._http.get(this.url+'searchService/'+ filtro);
  }

  public removeService(serviceid: string): Observable<any>
  {
    return this._http.delete(this.url+'deleteService/'+serviceid);
  }

  public updateService(serviceId:number ,serviceDescription: string, serviceName: string, serviceStateId: number, servicePrice:number): Observable<any>
  {
    return this._http.put(this.url+'updateService/'+serviceId,{serviceId, serviceDescription, serviceName, serviceStateId, servicePrice});
  }

  public updateServiceQualification(qualification:number,id:number ): Observable<any>
  {
    console.log( `datos del metodo ${qualification}   ${id}`)
    return this._http.patch(this.url+'updateServiceQualification/'+id,qualification);
  }
  
  public listServices(): Observable<any>
  {
    return this._http.get(this.url+'listService');
  }
  
  public saveServices(serviceDescription: string, serviceName: string, servicePrice:  number, serviceStateId: number): Observable<any>
  {
    return this._http.post(this.url+'saveService',{serviceDescription, serviceName,servicePrice , serviceStateId });
  }


  public PurchaseServices(product	:Product, purcharsePrice:number, purcharseType:number ): Observable<any>
  {
    return this._http.post(this.url+'registerPurcharse',{product, purcharsePrice, purcharseType });
  }

  public PurchaseServices2(service	:Service, purcharsePrice:number, purcharseType:number, ): Observable<any>
  {
    return this._http.post(this.url+'registerPurcharse',{service, purcharsePrice, purcharseType });
  }
  
}
