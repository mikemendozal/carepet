import { ResourceLoader } from '@angular/compiler';
import { Component, ElementRef,OnInit, Renderer2, ViewChild } from '@angular/core';
import { Pet } from 'src/app/interface/pet';
import { Product } from 'src/app/interface/product';
import { PetService } from 'src/app/services/pet.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-pet',
  templateUrl: './admin-pet.component.html',
  styleUrls: ['./admin-pet.component.css']
})
export class AdminPetComponent implements OnInit {

  @ViewChild('txtid') txtid!: ElementRef;
  @ViewChild('txtNombre') txtNombre!: ElementRef;
  @ViewChild('txtPeso') txtPeso!: ElementRef;
  @ViewChild('txtRaza') txtRaza!: ElementRef;
  @ViewChild('txtCategoria') txtCategoria!: ElementRef;
  @ViewChild('txtEdad') txtEdad!: ElementRef;
  @ViewChild('btnGuardar') btnGuardar!: ElementRef;
  @ViewChild('btnActualizar') btnActualizar!: ElementRef;
  @ViewChild('btnEliminar') btnEliminar!: ElementRef;
 
  
  
  constructor(
    private _servicePet: PetService,
    private _redender: Renderer2
  ) { }

  ngOnInit(): void {
    this.listarPet()
    this.inicializar();
    localStorage.setItem("delevery","0"); 
    localStorage.setItem("servicios","0"); 
    localStorage.setItem("citas","0"); 
    localStorage.setItem("citasA","0"); 
  }

  get getPet():Pet[]
  {
    return this._servicePet.getPet;
  }


  listarPet()
  {
    this._servicePet.listPet().subscribe((response)=>
    {
      
      response.forEach((element:any) => {
      
        var  pet : Pet ={

    
        user_person_personid :0,
        petId: element['petId'],
        petWeight: element['petWeight'],
        petName: element['petName'],
        petBreed: element['petBreed'],
        petCategory: element['petCategory'],
        petAge: element['petAge'],

        }
        this._servicePet.setPet = pet
        
       
      });
    });
   
  }
 
  elegir(pet:Pet)
  {
    // this._redender.addClass(this.btnGuardar.nativeElement, "btnGuardarClass")
    this._redender.setStyle(this.btnGuardar.nativeElement, "visibility", "collapse");
    this._redender.setStyle(this.btnActualizar.nativeElement, "visibility", "visible");
    this._redender.setStyle(this.btnEliminar.nativeElement, "visibility", "visible");

   
    this.txtid.nativeElement.value = pet.petId;
    this.txtPeso.nativeElement.value= pet.petWeight;
    this.txtRaza.nativeElement.value = pet.petBreed;
    this.txtNombre.nativeElement.value = pet.petName;
    this.txtCategoria.nativeElement.value = pet.petCategory;
    this.txtEdad.nativeElement.value = pet.petAge;
  }
  guardar(): void
  {
  const id =  this.txtid.nativeElement.value ;
  const peso =  this.txtPeso.nativeElement.value;
  const raza =  this.txtRaza.nativeElement.value ;
  const nombre =  this.txtNombre.nativeElement.value ;
  const categoria = this.txtCategoria.nativeElement.value ;
  const edad  = this.txtEdad.nativeElement.value;
  var valor: any  = localStorage.getItem("id");
      var pet: Pet= {
      
        user_person_personid :valor,
        petId: id,
        petWeight: peso,
        petName: nombre,
        petBreed: raza,
        petCategory: categoria,
        petAge: edad,
      }
      this._servicePet.savePet(pet.user_person_personid, pet.petAge,pet.petBreed,pet.petCategory,pet.petName,pet.petWeight).subscribe((response)=>
      {
        if(response != null && response != undefined)
        {
          alert('mascota guardado con exito');
          localStorage.setItem("delevery","0"); 
        }
        else 
        {
          alert('ERROR')
        }
        location.reload()
      });

      this.txtid.nativeElement.value ="";
      this.txtPeso.nativeElement.value= "";
      this.txtRaza.nativeElement.value ="";
      this.txtNombre.nativeElement.value ="";
      this.txtCategoria.nativeElement.value ="";
      this.txtEdad.nativeElement.value ="";
  }

  actualizar()
  {
    var valor: any  = localStorage.getItem("id");
    const id =  this.txtid.nativeElement.value ;
  const peso =  this.txtPeso.nativeElement.value;
  const raza =  this.txtRaza.nativeElement.value ;
  const nombre =  this.txtNombre.nativeElement.value ;
  const categoria = this.txtCategoria.nativeElement.value ;
  const edad  = this.txtEdad.nativeElement.value;

  var pet: Pet= {
      
    user_person_personid :valor,
    petId: id,
    petWeight: peso,
    petName: nombre,
    petBreed: raza,
    petCategory: categoria,
    petAge: edad,
  }
      this._servicePet.updatePet(pet.petId, pet.user_person_personid, pet.petAge,pet.petBreed,pet.petCategory,pet.petName,pet.petWeight).subscribe((response)=>
      {
        if(response != null && response != undefined)
        {
          alert('mascota actualizado con exito');
        }
        else 
        {
          alert('ERROR')
        }
        location.reload()
      });

      this.txtid.nativeElement.value ="";
      this.txtPeso.nativeElement.value= "";
      this.txtRaza.nativeElement.value ="";
      this.txtNombre.nativeElement.value ="";
      this.txtCategoria.nativeElement.value ="";
      this.txtEdad.nativeElement.value ="";
  }

  cancelar(){
    location.reload()
  }

  eliminar()
  {
    const id = this.txtid.nativeElement.value;

    this._servicePet.removePet(id).subscribe((response)=>
    {
      if (response)
      {
        alert('se elimino con exito')
      }
      location.reload()
    });
  }

  inicializar()
  {
    if(localStorage.getItem("pet")=='0')
    {
      
      localStorage.setItem("pet","-1");
      location.reload();
     
    }
  
  }


}
