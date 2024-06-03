import { ResourceLoader } from '@angular/compiler';
import { Component, ElementRef,OnInit, Renderer2, ViewChild, ɵɵqueryRefresh } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from '../../interface/service';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.css']
})
export class AdminServiceComponent implements OnInit{

  @ViewChild('txtid') txtid!: ElementRef;
  @ViewChild('txtNombre') txtNombre!: ElementRef;
  @ViewChild('txtDescripcion') txtDescripcion!: ElementRef;
  @ViewChild('txtEstado') txtEstado!: ElementRef;
  @ViewChild('btnGuardar') btnGuardar!: ElementRef;
  @ViewChild('btnActualizar') btnActualizar!: ElementRef;
  @ViewChild('btnEliminar') btnEliminar!: ElementRef;
  @ViewChild('btnMetodo') btnMetodo!: ElementRef;
  @ViewChild('txtPrecio') txtPrecio!: ElementRef;
  
 
  public stateService: any[] = 
   [ {
     stateId: 1,
    state: 'En espera'
    },
    {
      stateId: 2,
    state: 'En proceso'
  },{
    stateId: 3,
  state: 'Finalizado'
  }]
  
  constructor(
    private _service: ServiceService,
    private _redender: Renderer2
  ) { }

  ngOnInit(): void {
    this.inicializar()
    this.listarServices();
    localStorage.setItem("delevery","0"); 
    localStorage.setItem("productos","0"); 
    localStorage.setItem("citas","0"); 
    localStorage.setItem("citasA","0"); 
    
  }

  get getService():Service[]
  {
    return this._service.getService;
  }

  listarServices()
  {
    this._service.listServices().subscribe((response)=>
    {
      console.log(response)
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
        
       console.log(response)
      });
    });
   
  }
 
  elegir(service:Service)
  {
    // this._redender.addClass(this.btnGuardar.nativeElement, "btnGuardarClass")
    this._redender.setStyle(this.btnGuardar.nativeElement, "visibility", "collapse");
    this._redender.setStyle(this.btnActualizar.nativeElement, "visibility", "visible");
    this._redender.setStyle(this.btnEliminar.nativeElement, "visibility", "visible");

    this.txtid.nativeElement.value = service.serviceId;
    this.txtDescripcion.nativeElement.value= service.serviceDescription;
    this.txtNombre.nativeElement.value = service.serviceName;
    this.txtPrecio.nativeElement.value = service.servicePrice;
    const state=this.stateService.find(stateService => stateService.state === service.serviceState )
    console.log(this.btnMetodo.nativeElement.value= state['stateId'])

  }
  guardar(): void
  {
    const id = this.txtid.nativeElement.value;
    const descripcion = this.txtDescripcion.nativeElement.value;
    const nombre = this.txtNombre.nativeElement.value;
    const precio = this.txtPrecio.nativeElement.value;

      var service: Service= {
      serviceId : id,
      serviceDescription: descripcion,
      serviceState: "",
      serviceName: nombre,
      serviceQualification:0,
      servicePrice: precio
      }

      console.log(this.btnMetodo)
      if(this.btnMetodo.nativeElement.value == 0 )
      {
        this.btnMetodo.nativeElement.value = 1
      }
      this._service.saveServices(service.serviceDescription, service.serviceName, service.servicePrice ,this.btnMetodo.nativeElement.value).subscribe((response)=>
      {
        if(response != null && response != undefined)
        {
          alert('servicio guardado con exito');
          localStorage.setItem("delevery","0"); 
        }
        else 
        {
          alert('ERROR')
        }
      });

      this.txtDescripcion.nativeElement.value= "";
      this.txtNombre.nativeElement.value="";
      location.reload()
  }

  actualizar()
  {
    const id = this.txtid.nativeElement.value;
    const descripcion = this.txtDescripcion.nativeElement.value;
    const estado = this.btnMetodo.nativeElement.value;
    const nombre = this.txtNombre.nativeElement.value;
    const precio = this.txtPrecio.nativeElement.value;

      var service: Service= {
        serviceId : id,
      serviceDescription: descripcion,
      serviceState: estado,
      serviceName: nombre,
      serviceQualification:0,
      servicePrice: precio
      }
      if(this.btnMetodo.nativeElement.value == 0 )
      {
        this.btnMetodo.nativeElement.value = 1
      }
      this._service.updateService(service.serviceId,service.serviceDescription, service.serviceName, this.btnMetodo.nativeElement.value,service.servicePrice).subscribe((response)=>
      {
        if(response != null && response != undefined)
        {
          alert('servicio actualizado con exito');
        }
        else 
        {
          alert('ERROR')
        }
        location.reload()
      });

      this.txtid.nativeElement.value="";
      this.txtNombre.nativeElement.value="";
      this.txtDescripcion.nativeElement.value= "";
      this.txtPrecio.nativeElement.value="";
      this.btnMetodo.nativeElement.value="Seleccione el estado";
      
  }

  cancelar(){
    location.reload()
  }

  eliminar()
  {
    const id = this.txtid.nativeElement.value;

    this._service.removeService(id).subscribe((response)=>
    {
    
      if (response)
      {
        alert('se elimino con exito')
      }
      location.reload()
    });

  }

  valor(value: number)
  {
    this.btnMetodo.nativeElement.value= value
  }

  inicializar()
  {
    if(localStorage.getItem("servicios")=='0')
    {
      
      localStorage.setItem("servicios","-1");
      location.reload();
     
    }
  
  }

}
