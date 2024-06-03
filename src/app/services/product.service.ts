import { Injectable } from '@angular/core';
import {  Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { global } from './global.service';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url: string;

 
  private _servicesProduct: Product[] = [];


  constructor(

    private _http: HttpClient
  ) { 

    this.url = global.url;
  }


  get getProduct(): Product[]
  {
    return [...this._servicesProduct];
  }

  set setProduct(product: Product)
  {
    this._servicesProduct.push(product);
  }

  //METODOS PARA EL CRUD DE SERVICE

  public searchProduct(filtro:string):Observable<any>
  {
    return this._http.get(this.url+'readProduct/'+ filtro);
  }

  public removeProduct(productid: string): Observable<any>
  {
    return this._http.delete(this.url+'deleteProduct/'+productid);
  }

  public updateProduct(productid: number, productName: string ,productPrice: number, productDescription: string,  productQualification: number): Observable<any>
  {
    return this._http.put(this.url+'updateProduct/'+productid,{productName ,productPrice, productDescription,  productQualification});
  }

  public updateProductQualification(qualification: number,id: number): Observable<any>
  {
    console.log( `datos del metodo ${qualification}   ${id}`)
    return this._http.patch(this.url+'updateProductQualification/'+id,qualification);
  }

  public listProduct(): Observable<any>
  {
    return this._http.get(this.url+'listProduct');
  }

  public saveProducts( productName: string ,productPrice: number, productDescription: string,  productQualication: number): Observable<any>
  {
    return this._http.post(this.url+'registerProduct',{productName ,productPrice, productDescription,  productQualication});
  }
  

  public topvendidos(): Observable<any>
  {
    return this._http.get(this.url+'listTopProduct');
  }
}
