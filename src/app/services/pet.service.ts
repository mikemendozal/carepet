import { Injectable } from '@angular/core';
import {  Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { global } from './global.service';
import { Product } from '../interface/product';
import { Pet } from '../interface/pet';
import { AppoIntment } from '../interface/appoIntment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  public url: string;

 
  private _servicesPet: Pet[] = [];


  constructor(

    private _http: HttpClient
  ) { 

    this.url = global.url;
  }


  get getPet(): Pet[]
  {
    return [...this._servicesPet];
  }

  set setPet(pet: Pet)
  {
    this._servicesPet.push(pet);
  }

  //METODOS PARA EL CRUD DE SERVICE

  public searchPet(filtro:string):Observable<any>
  {
    return this._http.get(this.url+'readProduct/'+ filtro);
  }

  public removePet(productid: string): Observable<any>
  {
    return this._http.delete(this.url+'deletePet/'+productid);
  }

  public updatePet(petId:number,userId:number, petAge:number  ,petBreed:string ,petCategory:string ,
    petName:string ,petWeight:number): Observable<any>
  {
    return this._http.put(this.url+'updatePet/'+petId,{petId,userId, petAge  ,petBreed ,petCategory,
      petName ,petWeight});
  }

  public listPetUser(id:number):Observable<any>
  {
    return this._http.get(this.url+'listPetUser/'+ id);
  }

  
  public listPet(): Observable<any>
  {
    return this._http.get(this.url+'listPet');
  }


  public estadoMascota(id: number): Observable<any>
  {
    return this._http.get(this.url+'serviceStateQuery/'+id);
  }


  public savePet( userId:number, petAge:number  ,petBreed:string ,petCategory:string ,
    petName:string ,petWeight:number ): Observable<any>
  {
    return this._http.post(this.url+'registerPet',{userId, petAge  ,petBreed ,petCategory,
      petName ,petWeight });
  }
}
