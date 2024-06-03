import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { AppoIntment } from '../../interface/appoIntment';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-estado-cita',
  templateUrl: './estado-cita.component.html',
  styleUrls: ['./estado-cita.component.css']
})
export class EstadoCitaComponent implements OnInit {

  
  @ViewChild('btnGuardar') btnGuardar!: ElementRef;
  @ViewChild('txtNombre') txtNombre!: ElementRef;


  public listTop: any[] = []; 

  constructor(
    private _appointmen: AppointmentService
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
    var valor: any = localStorage.getItem("id");

    this._appointmen.listarCitasUser(valor).subscribe((response)=>
    {console.log(response)

      response.forEach((element:any) => {
      
        var  estados : any ={
        id: element[0],
        estado: element[1]
        }

      if ( estados.estado)
      {
        estados.estado = "aprobada"
      }
      else 
      {
        estados.estado = "rechazada"
      }
        this.listTop.push(estados);
      });


     
    })

  
  
  }
  get getAppointment():AppoIntment[]
  {
    return this._appointmen.getAppointment;
  }



}




