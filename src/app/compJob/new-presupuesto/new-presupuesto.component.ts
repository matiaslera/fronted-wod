import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { PopupPresupuestoComponent } from '../popup-presupuesto/popup-presupuesto.component';

@Component({
  selector: 'app-new-presupuesto',
  templateUrl: './new-presupuesto.component.html',
  styleUrls: ['./new-presupuesto.component.css']
})
export class NewPresupuestoComponent implements OnInit {


  /* basePresupuestos: Presupuesto[]; */
  busquedaForm = this.builder.group({
    problema: ['', Validators.required],
    especialidad: ['', Validators.required],
  });
  
  especialidad: string[] = ["Electricidad", "Plomeria", "Herreria","Gasista","Carpinteria","Pintor","Armado en Seco"];

 /*  problemas:Presupuesto[]; */

  constructor(private builder: FormBuilder,/*  private presService:PresupuestoService ,*/private profileService: ProfileService,
     public dialog: MatDialog  ) { }

  ngOnInit(): void {
    this.getPresupuestos()
  }

  async buscar(){
    try {
      //await this.presService.busqueda(this.busquedaForm.value)
      //this.problemas=this.presService.basePresupuestos
    }
    catch (e) {
      e.error
    }
    console.log(this.busquedaForm.value);
    
  }

  async getPresupuestos(){
     //this.problemas=await this.presService.presupuesto()
  }


  clear(){
    this.busquedaForm.patchValue({
      problema: '',
      especialidad: '',
    });
  
  }
  create(){
    const dialogRef = this.dialog.open(PopupPresupuestoComponent, {
      height: '600px',
      width: '700px',
      data: {especialidad:this.busquedaForm.get('especialidad').value,
        problema:  this.busquedaForm.get('problema').value} })
  
  }

  esCliente():boolean{
    return true
  //  this.profileService.tipo()
    //return this.profileService.esCliente
  } 
}
