import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Trabajo } from 'src/app/domain/trabajo';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { PopupPresupuestoComponent } from '../popup-presupuesto/popup-presupuesto.component';

@Component({
  selector: 'app-new-presupuesto',
  templateUrl: './new-presupuesto.component.html',
  styleUrls: ['./new-presupuesto.component.css']
})
export class NewPresupuestoComponent implements OnInit {

    problemas:Trabajo[]; 
  /* basePresupuestos: Presupuesto[]; */
  busquedaForm = this.builder.group({
    problema: ['', Validators.required],
    especialidad: ['', Validators.required],
  });
  especialidad: string[] = ["Electricidad", "Plomeria", "Herreria","Gasista","Carpinteria","Pintor","Armado en Seco"];


  constructor(private builder: FormBuilder,  private presService:TrabajoService ,private profileService: ProfileService,
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
     this.problemas=await this.presService.trabajosFinalizados()
     console.log(this.problemas)
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
