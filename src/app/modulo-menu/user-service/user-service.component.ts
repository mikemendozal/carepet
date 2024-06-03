import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../interface/service';
import { ServiceService } from '../../services/service.service';
import { browser } from 'protractor';
import { Admin } from '../../interface/admin';
import { UserService } from '../../services/user.service';
import { AppoIntment } from '../../interface/appoIntment';


@Component({
  selector: 'app-user-service',
  templateUrl: './user-service.component.html',
  styleUrls: ['./user-service.component.css']
})
export class UserServiceComponent implements OnInit {

  public services: Service[]= []
  // [
  //   {
  //     serviceid : '1',
  //     serviceDescription: 'consulta sobre lo que necesita el cliente',
  //     serviceState: 'iniciado',
  //     serviceName: 'Consulta',
  //     serviceCalification: 3
      
  //   },
  //   {
  //     serviceid : '2',
  //     serviceDescription: 'hospedaje, cuidado y alimentacion a la mascota',
  //     serviceState: 'proceso',
  //     serviceName: 'Guarderia',
  //     serviceCalification: 4
  //   },
  //   {
  //     serviceid : '3',
  //     serviceDescription: 'cepillado canino',
  //     serviceState: 'finalizado',
  //     serviceName: 'Cepillado',
  //     serviceCalification: 5
  //   }
  // ]

  constructor() { }

  addCalification(calification:any){
    this.services.forEach(serviceCalification => {
      serviceCalification=calification.value;
      console.log(serviceCalification);
    });
    calification.value='';
    calification.focus();
    return false;
}

  ngOnInit(): void {
    localStorage.setItem("productos","0"); 
    localStorage.setItem("servicios","0"); 
    localStorage.setItem("citas","0"); 
    localStorage.setItem("citasA","0"); 
  }

  Gservices(services: Service)
  {
    console.log(services);
  }

}
