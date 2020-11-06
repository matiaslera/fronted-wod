import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogJob, Oferta } from 'src/app/domain/oferta';
import { Presupuesto } from 'src/app/domain/presupuesto';
import { Usuario } from 'src/app/domain/user';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { JobDetallesComponent } from '../job-detalles/job-detalles.component';

@Component({
  selector: 'app-job-contatar',
  templateUrl: './job-contatar.component.html',
  styleUrls: ['./job-contatar.component.css'],
})
export class JobContatarComponent implements OnInit {
  //oferta: Oferta;
  profesional: Usuario = new Usuario();
  constructor(
    public dialogRef: MatDialogRef<JobDetallesComponent>,
     private perfil: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: DialogJob
  ) {}

  ngOnInit(): void {
    this.updateData();
    console.log("data:", this.data)
    console.log("oferta:", this.data.oferta)
    console.log("presupuesto:", this.data.presupuesto)
  }

  async updateData() {
    //this.oferta = this.data.oferta;
    console.log(this.presupuesto);
    if (this.estaContratado()) {
      return true; /// this.profesional = await this.perfil.getProfesional(this.presupuesto.idProfesional)
    }
    if (this.estaFinalizado()) {
      return false;
      //  this.profesional = await this.perfil.getProfesional(this.presupuesto.idProfesional)
    }
  }

  get presupuesto(){
    return this.data.presupuesto.presupuesto
  }

  get oferta(){
    return this.data.oferta
  }

  cancelar() {
    console.log('The dialog esta cerrado');
    this.dialogRef.close();
  }

  async aceptar() {
    try {
      /*  this.presupuesto.monto=this.oferta.monto
    this.presupuesto.notas=this.oferta.comentario
    this.presupuesto.idProfesional=this.oferta.idProfesional
    this.presupuesto.ofertas= []
    await this.preService.contratar(this.presupuesto) */
      console.log('The dialog aceptoooo');
    } catch (e) {
      e.error;
    }
    console.log('The dialog rechazo la consulta');
    this.dialogRef.close();
  }

  estaContratado() {
    return false;
    //return this.presupuesto.contratado && !this.presupuesto.realizado
  }

  estaFinalizado() {
    return false;
    //return this.presupuesto.contratado && this.presupuesto.realizado
  }

  sinContratar() {
    return true;
    //  return !this.presupuesto.contratado && !this.presupuesto.realizado
  }

  async finalizar() {
    try {
      /*  this.presupuesto.contratado =true
       this.presupuesto.realizado =true
      await this.preService.finalizar(this.presupuesto) */
      console.log('The dialog ya esta finalizado el trabajo');
    } catch (e) {
      e.error;
    }
    console.log('The dialog rechazo finalizar la consulta');
    this.dialogRef.close();
  }
}
