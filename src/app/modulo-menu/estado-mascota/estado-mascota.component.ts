import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { AppoIntment } from '../../interface/appoIntment';

@Component({
  selector: 'app-estado-mascota',
  templateUrl: './estado-mascota.component.html',
  styleUrls: ['./estado-mascota.component.css']
})
export class EstadoMascotaComponent implements OnInit {

  @ViewChild('btnGuardar') btnGuardar!: ElementRef;
  @ViewChild('txtNombre') txtNombre!: ElementRef;

  constructor(

    private _servicePet: PetService,
  ) { }

  public estado: string = "";
  ngOnInit(): void {

    localStorage.setItem("delevery","0"); 
    localStorage.setItem("servicios","0"); 
    localStorage.setItem("citas","0"); 
    localStorage.setItem("citasA","0"); 
  }

  validar()
  {
    const id = this.txtNombre.nativeElement.value;
 

     

    this._servicePet.estadoMascota(id).subscribe((response)=>
    {
      var estado : string;
      console.log(response)
       
      if(response == 1)
      {
        estado = 'En espera'
      }else if(response == 2)
      {
        estado = 'En proceso'
      }
      else {
        estado = 'Finalizado'
      }
      this.estado = estado;
    })
    

  }

}
