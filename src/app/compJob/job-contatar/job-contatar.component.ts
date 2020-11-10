import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogJob, Oferta } from 'src/app/domain/oferta';
import { Profesional } from 'src/app/domain/profesional';
import { Estado } from 'src/app/domain/trabajo';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { JobDetallesComponent } from '../job-detalles/job-detalles.component';

@Component({
  selector: 'app-job-contatar',
  templateUrl: './job-contatar.component.html',
  styleUrls: ['./job-contatar.component.css'],
})
export class JobContatarComponent implements OnInit {
  datemin = new Date();
  profesional: Profesional = new Profesional();
  constructor(
    public dialogRef: MatDialogRef<JobDetallesComponent>,
    private perfil: ProfileService,
    private trabajoServ: TrabajoService,
    @Inject(MAT_DIALOG_DATA) public data: DialogJob,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.updateData();
    console.log('data:', this.data);
    console.log('oferta:', this.data.oferta);
    console.log('presupuesto:', this.data.presupuesto);
  }

  get presupuesto() {
    return this.data.presupuesto.presupuesto;
  }

  get oferta() {
    return this.data.oferta;
  }
  async updateData() {
   if(this.estaContratado())
   {this.profesional= await this.perfil.getIdProfesional(this.data.presupuesto.idProfesional)}
  }

  cancelar() {
    console.log('The dialog esta cerrado');
    this.dialogRef.close();
  }

  async aceptar() {
    try {
      this.data.presupuesto.montoFinal = this.oferta.montoAprox;
      this.data.presupuesto.idProfesional = this.oferta.idProfesional;
      this.data.presupuesto.estado= Estado.CONTRATADO
      await this.trabajoServ.contratar(this.data.presupuesto);
      console.log('The dialog aceptoooo');
    } catch (e) { 
      e.error;
    }
    console.log('The dialog rechazo la consulta');
    this.dialogRef.close();
  }

  sinContratar() {
    return  this.data.presupuesto.estado===Estado.PUBLICADO;
  }
  estaContratado() {
    return this.data.presupuesto.estado===Estado.CONTRATADO;
  }
  estaFinalizado() {
    return this.data.presupuesto.estado===Estado.FINALIZADO;
  }

  async finalizar() {
    try {
      this.data.presupuesto.estado= Estado.FINALIZADO
      await this.trabajoServ.contratar(this.data.presupuesto);
      console.log('The dialog ya esta finalizado el trabajo');
    } catch (e) {
      e.error;
    }
    console.log('The dialog rechazo finalizar la consulta');
    this.dialogRef.close();
  }
  
  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 3000,
    });
  }
}
