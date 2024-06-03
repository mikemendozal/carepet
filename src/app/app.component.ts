import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CarePet';

  public validar : string;
  public rol : string;

  constructor(private router:Router) { 
    this.validar = "";
    this.rol = "";
  }

  ngOnInit(): void {
    this.validar = localStorage.getItem("ref") || '0';
    this.rol = localStorage.getItem("rol") || '0';
  }


  salir()
  {
    localStorage.removeItem("ref")
    localStorage.removeItem("admin")
    localStorage.removeItem("val")
    this.router.navigate(['/index']);

  }
}



