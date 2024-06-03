import { Component, ElementRef,OnInit, Renderer2, ViewChild } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  @ViewChild('txtid') txtid!: ElementRef;
  @ViewChild('txtNombre') txtNombre!: ElementRef;
  @ViewChild('txtDescripcion') txtDescripcion!: ElementRef;
  @ViewChild('txtPrecio') txtPrecio!: ElementRef;
  @ViewChild('txtCalificacion') txtCalificacion!: ElementRef;
  @ViewChild('btnGuardar') btnGuardar!: ElementRef;
  @ViewChild('btnActualizar') btnActualizar!: ElementRef;
  @ViewChild('btnEliminar') btnEliminar!: ElementRef;
 
  
  constructor(
    private _serviceProduct: ProductService,
    private _redender: Renderer2
  ) { }

  ngOnInit(): void {
    this.listarProduct()
    this.inicializar();
    localStorage.setItem("delevery","0"); 
    localStorage.setItem("servicios","0"); 
    localStorage.setItem("citas","0"); 
    localStorage.setItem("citasA","0"); 
  }

  get getProduct():Product[]
  {
    return this._serviceProduct.getProduct;
  }


  listarProduct()
  {
    this._serviceProduct.listProduct().subscribe((response)=>
    {
      console.table(response)
      response.forEach((element:any) => {
      
        var  product : Product ={
        productId : element['productId'],
        productName: element['productName'],
        productPrice: element['productPrice'],
        productDescription: element['productDescription'],
        productQualication: element['productQualification'],
        }
        this._serviceProduct.setProduct = product
        
       
      });
    });
   
  }
 
  elegir(product:Product)
  {
    // this._redender.addClass(this.btnGuardar.nativeElement, "btnGuardarClass")
    this._redender.setStyle(this.btnGuardar.nativeElement, "visibility", "collapse");
    this._redender.setStyle(this.btnActualizar.nativeElement, "visibility", "visible");
    this._redender.setStyle(this.btnEliminar.nativeElement, "visibility", "visible");

    this.txtid.nativeElement.value = product.productId;
    this.txtDescripcion.nativeElement.value= product.productDescription;
    this.txtPrecio.nativeElement.value = product.productPrice;
    this.txtNombre.nativeElement.value = product.productName;
    this.txtCalificacion.nativeElement.value = product.productQualication;
  }
  guardar(): void
  {
    const descripcion = this.txtDescripcion.nativeElement.value;
    const nombre = this.txtNombre.nativeElement.value;
    const id = this.txtid.nativeElement.value;
    const precio = this.txtPrecio.nativeElement.value;
    //const calificacion = this.txtCalificacion.nativeElement.value;

      var product: Product= {
        productId : id,
        productName: nombre,
        productPrice: precio,
        productDescription: descripcion,
        productQualication: 0
      }
      this._serviceProduct.saveProducts(product.productName, product.productPrice, product.productDescription, product.productQualication).subscribe((response)=>
      {
        if(response != null && response != undefined)
        {
          alert('producto guardado con exito');
          localStorage.setItem("delevery","0"); 
        }
        else 
        {
          alert('ERROR')
        }
        location.reload()
      });

      this.txtDescripcion.nativeElement.value= "";
      this.txtPrecio.nativeElement.value= "";
      this.txtNombre.nativeElement.value="";
      this.txtid.nativeElement.value="";
      this.txtCalificacion.nativeElement.value="";
  }

  actualizar()
  {
    const descripcion = this.txtDescripcion.nativeElement.value;
    const nombre = this.txtNombre.nativeElement.value;
    const id = this.txtid.nativeElement.value;
    const precio = this.txtPrecio.nativeElement.value;
    const calificacion = this.txtCalificacion.nativeElement.value;

    var product: Product= {
      productId : id,
      productName: nombre,
      productPrice: precio,
      productDescription: descripcion,
      productQualication: calificacion
    }
      this._serviceProduct.updateProduct(product.productId,product.productName, product.productPrice, product.productDescription, product.productQualication).subscribe((response)=>
      {
        if(response != null && response != undefined)
        {
          alert('producto actualizado con exito');
        }
        else 
        {
          alert('ERROR')
        }
        location.reload()
      });

      this.txtid.nativeElement.value="";
      this.txtDescripcion.nativeElement.value= "";
      this.txtPrecio.nativeElement.value= "";
      this.txtNombre.nativeElement.value="";
      this.txtCalificacion.nativeElement.value="";
  }

  cancelar(){
    location.reload()
  }

  eliminar()
  {
    const id = this.txtid.nativeElement.value;

    this._serviceProduct.removeProduct(id).subscribe((response)=>
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
    if(localStorage.getItem("productos")=='0')
    {
      
      localStorage.setItem("productos","-1");
      location.reload();
     
    }
  
  }

}