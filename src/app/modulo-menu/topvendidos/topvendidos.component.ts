import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { ProductService } from 'src/app/services/product.service';
import { AppoIntment } from '../../interface/appoIntment';
import { AppointmentService } from '../../services/appointment.service';


@Component({
  selector: 'app-topvendidos',
  templateUrl: './topvendidos.component.html',
  styleUrls: ['./topvendidos.component.css']
})
export class TopvendidosComponent implements OnInit {

  @ViewChild('btnGuardar') btnGuardar!: ElementRef;
  @ViewChild('txtNombre') txtNombre!: ElementRef;


  public listTop: any[] = []; 
  constructor(

    private _servicePet: PetService,
    private _appointmen: AppointmentService,
    private _serviceProduct: ProductService,
  ) { 

    localStorage.setItem("delevery","0"); 
    localStorage.setItem("servicios","0"); 
    localStorage.setItem("citas","0"); 
    localStorage.setItem("citasA","0"); 
  }

  public estado: string = "";
  ngOnInit(): void {

    localStorage.setItem("delevery","0"); 
    localStorage.setItem("servicios","0"); 
    localStorage.setItem("citas","0"); 
  }

  validar()
  {

    // pro.product_id, product_name, pro.product_description, pro.product_price,
    //  pro.product_qualification, COUNT(pur.product_id) as Cantidad
    this._serviceProduct.topvendidos().subscribe((response)=>
    {
      response.forEach((element:any) => {
      
        var  product : any ={
        productId : element[0],
        productName: element[1],
        productPrice: element[3],
        productDescription: element[2],
        productQualication: element[4],
        cantidad : element[5]
        }
        this.listTop.push(product);
      });
    })
  }

}
