import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AppoIntment } from '../interface/appoIntment';
import { Pet } from '../interface/pet';
import { Service } from '../interface/service';
import { User } from '../interface/user';
import { AppointmentService } from '../services/appointment.service';
import { PetService } from '../services/pet.service';
import { ServiceService } from '../services/service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-appointment',
  templateUrl: './user-appointment.component.html',
  styleUrls: ['./user-appointment.component.css']
})
export class UserAppointmentComponent implements OnInit {

  @ViewChild('txtid') txtid!: ElementRef;
  @ViewChild('datefecha') datefecha!: ElementRef;
  @ViewChild('selectPet') selectPet!: ElementRef;
  @ViewChild('selectService') selectService!: ElementRef;
  @ViewChild('selectUser') selectUser!: ElementRef;
  @ViewChild('btnGuardar') btnGuardar!: ElementRef;
  @ViewChild('btnActualizar') btnActualizar!: ElementRef;
  @ViewChild('btnCancelar') btnCancelar!: ElementRef;
  @ViewChild('btnEliminar') btnEliminar!: ElementRef;
  @ViewChild('btnservice') btnservice!: ElementRef;
  @ViewChild('btnpet') btnpet!: ElementRef;

  constructor(
    private _appointment: AppointmentService,
    private _service: ServiceService,
    private _servicePet: PetService,
    private _redender: Renderer2
  ) { }

  
  ngOnInit(): void {
    this.listarAppointment();
    this.listarServices();
    this.listarPet();
    this.inicializar();
    localStorage.setItem("delevery","0"); 
    localStorage.setItem("productos","0"); 
    localStorage.setItem("citasA","0"); 
    
  }

  get getPet(): Pet[]
  {
    return this._servicePet.getPet;
  }
  
  get getService(): Service[]
  {
    return this._service.getService;
  }
 
  get getAppointment():AppoIntment[]
  {
    return this._appointment.getAppointment;
  }

  listarPet()
  {
    var valor: any = localStorage.getItem("id");
    this._servicePet.listPetUser(valor).subscribe((response)=>
    {
   
      response.forEach((element:any) => {
      
        var  pet : Pet ={

    
        user_person_personid :0,
        petId: element[0],
        petWeight: 0,
        petName: element[3],
        petBreed: element[2],
        petCategory: element[4],
        petAge: element[1],

        }
        this._servicePet.setPet = pet
        
       
      });
    });
   
  }

  listarServices()
  {
    this._service.listServices().subscribe((response)=>
    {
      
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

  listarAppointment()
  {
    this._appointment.listAppointment().subscribe((response)=>
    {
      
       response.forEach((element: any) => {
         
         var appointment: AppoIntment={
            appointmentid : element['appointmentId'],
            appointmentDate : element['appointmentDate'],
            petId: element['pet'],
            serviceId: element['service'],
            appointmentUser: element['user'],
          }

          this._appointment.setAppointment = appointment;
       });
       
        
     
    });
   
  }
 

  valorservice(id: number)
  {
    this.btnservice.nativeElement.value= id;
    console.log(id)
  }



  valorPet(id : number)
  {
    this.btnpet.nativeElement.value = id;
  }

  elegir(appointmen:AppoIntment)
  {
    // this._redender.addClass(this.btnGuardar.nativeElement, "btnGuardarClass")
    this._redender.setStyle(this.btnGuardar.nativeElement, "visibility", "collapse");
    this._redender.setStyle(this.btnActualizar.nativeElement, "visibility", "visible");
    this._redender.setStyle(this.btnEliminar.nativeElement, "visibility", "visible");

    this.txtid.nativeElement.value = appointmen.appointmentid;
    //this.btnpet.nativeElement.value= appointmen.petId;
    //this.btnservice.nativeElement.value = appointmen.serviceId;
    // this.txtPrecio.nativeElement.value = service.servicePrice;

  }
  guardar(): void
  {
    const id = this.txtid.nativeElement.value;
    // const descripcion = this.txtDescripcion.nativeElement.value;
    // const nombre = this.txtNombre.nativeElement.value;
    // const precio = this.txtPrecio.nativeElement.value;
    let user : any = localStorage.getItem("id")


    if(this.btnpet.nativeElement.value ==0 )
    {
      this.btnpet.nativeElement.value= 1
    }

    if(this.btnservice.nativeElement.value ==0)
    {
      this.btnservice.nativeElement.value = 1
    }
    var  pet : Pet ={
      user_person_personid :0,
      petId: this.btnpet.nativeElement.value,
      petWeight: 0,
      petName: "",
      petBreed: "",
      petCategory:"" ,
      petAge: 0
      }

      var service: Service = 
      {
        serviceId : this.btnservice.nativeElement.value,
        serviceDescription: "",
        serviceState: "",
        serviceName: "",
        serviceQualification: 0,
        servicePrice: 0
      }

      let use : any={
        personId: user,
        personCedula: 0,
        personPhone: 0,
        userEmail: "",
        userPassword: "",
        personName: "",
        personAge: 0
      }

   

    this._appointment.saveAppointment(use, service, pet, new Date).subscribe((response) => {
      if (response != null && response != undefined) {
        alert('servicio guardado con exito');
        localStorage.setItem("delevery", "0");
      }
      else {
        alert('ERROR')
      }
    });
     // location.reload()
  }

  actualizar()
  {
    const id = this.txtid.nativeElement.value;
    // const descripcion = this.txtDescripcion.nativeElement.value;
    // const nombre = this.txtNombre.nativeElement.value;
    // const precio = this.txtPrecio.nativeElement.value;
    let user : any = localStorage.getItem("id")
    var  pet : Pet ={
      user_person_personid :0,
      petId: this.btnpet.nativeElement.value,
      petWeight: 0,
      petName: "",
      petBreed: "",
      petCategory:"" ,
      petAge: 0
      }

      var service: Service = 
      {
        serviceId : this.btnservice.nativeElement.value,
        serviceDescription: "",
        serviceState: "",
        serviceName: "",
        serviceQualification: 0,
        servicePrice: 0
      }

      this._appointment.updateAppointment(user, service, pet, id).subscribe((response)=>
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
      location.reload()
  }

  cancelar(){
    location.reload()
  }

  eliminar()
  {
    const id = this.txtid.nativeElement.value;
    console.log("el id" + id)
    this._appointment.removeAppointment(id).subscribe((response)=>
    {
      console.log(response)
      if(response == null)
      {
        alert('cita  eliminada con exito'); 
      }
      else 
      {
        alert('ERROR')
      }
      location.reload()
    });

  }

 

  inicializar()
  {
    if(localStorage.getItem("citas")=='0')
    {
      
      localStorage.setItem("citas","-1");
      location.reload();
     
    }
  
  }
}

