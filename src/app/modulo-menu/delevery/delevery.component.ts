import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DeleveryState } from 'src/app/interface/deleveryState';
import { Product } from 'src/app/interface/product';
import { Service } from 'src/app/interface/service';
import { ProductService } from 'src/app/services/product.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-delevery',
  templateUrl: './delevery.component.html',
  styleUrls: ['./delevery.component.css']
})
export class DeleveryComponent implements OnInit{
  deepId: number=1;
  qualificationProduct:number=0;
  qualificationService:number=0;

  constructor(
    private _serviceProduct: ProductService,
    private _service: ServiceService,

  ) { }
 
  public contador: number= 0;

  ngOnInit(): void {
   this.inicializar();
    this.listarServices();
    this.listarProduct();
    localStorage.setItem("servicios","0"); 
    localStorage.setItem("productos","0"); 
    localStorage.setItem("citas","0"); 
    localStorage.setItem("citasA","0"); 
  }

  @ViewChild('btnMetodo') btnMetodo!: ElementRef;
  @ViewChild('txtCalificacionP') txtCalificacionP!: ElementRef;
  @ViewChild('txtCalificacionS') txtCalificacionS!: ElementRef;
  @ViewChild('btnGuardarCalService') btnGuardarCalService!: ElementRef;
  
  get getProduct():Product[]
  {
    return this._serviceProduct.getProduct;
  }

  get getService():Service[]
  {
    return this._service.getService;
  }

  
  
  listarServices()
  {
    this._service.listServices().subscribe((response)=>
    {
      localStorage.setItem("del", "1");
      response.forEach((element:any) => {
        let estado : string;
       
        if(element['serviceStateId'] == 1)
        {
          estado = 'En espera'
        }else if(element['serviceStateId'] == 2)
        {
          estado = 'En proceso'
        }
        else {
          estado = 'Finalizado'
        }
       
        var  service : Service ={
          serviceId : element['serviceId'],
          serviceDescription: element['serviceDescription'],
          serviceState: estado,
          serviceName: element['serviceName'],
          serviceQualification: 0,
          servicePrice: element['servicePrice']
        }
        this._service.setService = service
        
       
      });
    });
   
  }


  
  listarProduct()
  {
    this._serviceProduct.listProduct().subscribe((response)=>
    {
      
      response.forEach((element:any) => {
      
        var  product : Product ={
        productId : element['productId'],
        productName: element['productName'],
        productPrice: element['productPrice'],
        productDescription: element['productDescription'],
        productQualication: element['productQualication'],
        }
        this._serviceProduct.setProduct = product
       
      });
    });
   
  }

  
  

  public stateDeliverys:   DeleveryState[] = 
   [ {
     stateDeliveryId: 1,
    stateDeliveryDescription: 'Domicilio'
  },
  {
    stateDeliveryId: 2,
    stateDeliveryDescription: 'Tienda'
  }]

  
  valor(value: number)
  {
    this.btnMetodo.nativeElement.value= value
  }
  ventaProduct(product: Product)
  {
    var dateDay = new Date();
    // var listaProduct: Product [] = []
    // listaProduct.push(product)
    this._service.PurchaseServices(product , product.productPrice,  this.deepId).subscribe((response)=>
    {
      if(response != null && response != undefined)
      {
        alert('Venta Exitosa, id'+this.btnMetodo.nativeElement.value);
        console.log(this.btnMetodo.nativeElement.value);
      }
      else 
      {
        alert('ERROR')
      }
    })
  }

  ventaService(service: Service)
  {
    var dateDay = new Date();
    // var listaProduct: Product [] = []
    // listaProduct.push(product)
    this._service.PurchaseServices2(service , service.servicePrice,  this.deepId).subscribe((response)=>
    {
      if(response != null && response != undefined)
      {
        alert('Venta Exitosa');
      }
      else 
      {
        alert('ERROR')
      }
    })
  }

  validarCalService(service: Service)
  {
  
    const qualification= this.qualificationService;
    this._service.updateServiceQualification(qualification,service.serviceId).subscribe((response)=>
    {
      if(response != null && response != undefined)
      {
        alert('Servicio Calificado');
      }
      else 
      {
        alert('ERROR')
      }
    })
  }


  validarCalProduct(product: Product)
  {
    const qualification = this.qualificationProduct;
    console.log(qualification)
    //const id = this.idService;
  this._serviceProduct.updateProductQualification(qualification,product.productId).subscribe((response)=>
  {
   // console.log(id)
    if(response != null && response != undefined)
    {
      alert('Producto  Calificado');
    }
    else 
    {
      alert('ERROR')
    }
  })
  }

  
inicializar()
{
  // if(localStorage.getItem("val")=='0')
  // {
    
  //   localStorage.setItem("val","-1");
  //   location.reload();
   
  // }


  if(localStorage.getItem("delevery") == '0')
  {
    location.reload();
  localStorage.setItem("delevery", "1");
  }

}

}
