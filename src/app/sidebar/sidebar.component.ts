import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html', 
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public rol : string;

  constructor(private router:Router) { 
    this.rol = "";
  }

  ngOnInit(): void {
    this.rol = localStorage.getItem("rol") || '0';
    
  }


  salir()
  {
    localStorage.removeItem("ref")
    localStorage.removeItem("admin")
    localStorage.removeItem("val")
    this.router.navigate(['/login']);

  }
}
