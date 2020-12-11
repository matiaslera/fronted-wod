import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogJob } from 'src/app/domain/oferta';
import { Pago } from 'src/app/domain/pago';
import { Profesional } from 'src/app/domain/profesional';
import { Estado } from 'src/app/domain/trabajo';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { JobComponent } from '../job/job.component';

@Component({
  selector: 'app-pay-job',
  templateUrl: './pay-job.component.html',
  styleUrls: ['./pay-job.component.css'],
})
export class PayJobComponent implements OnInit {
  profesional: Profesional = new Profesional();
  /** */
  mostarAdd:boolean=false
  mostarDetalles:boolean=false
  mediosPagos:Pago[]
  elementoSeleccion:Pago
  
  metodoPago: number;
  constructor(
    public dialogRef: MatDialogRef<JobComponent>,
    private perfil: ProfileService,
    private trabajoServ: TrabajoService,
    @Inject(MAT_DIALOG_DATA) public data: DialogJob,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.updateData();
    console.log('oferta:', this.data.oferta);
    console.log('presupuesto:', this.data.presupuesto);
  }

  get presupuesto() {
    return this.data.presupuesto.presupuesto;
  }

  async updateData() {
    if (this.estaContratado()) {
      this.profesional = await this.perfil.getIdProfesional(this.data.presupuesto.idProfesional);
      this.mediosPagos=this.profesional.mediosPagos
    }
  }

  cancelar() {
    console.log('The dialog esta cerrado');
    this.dialogRef.close();
  }

  sinContratar() {
    return this.data.presupuesto.estado === Estado.PUBLICADO;
  }
  estaContratado() {
    return this.data.presupuesto.estado === Estado.CONTRATADO;
  }
  estaFinalizado() {
    return this.data.presupuesto.estado === Estado.FINALIZADO;
  }

  async finalizar() {
    try {
      this.data.presupuesto.estado = Estado.FINALIZADO;
      this.profesional.trabajos.push(this.data.presupuesto)
      await this.trabajoServ.update(this.data.presupuesto);
      this.perfil.actualizarProfesional(this.profesional);
      this.mensaje('Se ha finalizado el trabajo');
    } catch (e) {
      e.error;
    }
    console.log('The dialog rechazo finalizar la consulta');
    this.dialogRef.close();
    this.router.navigate(['/jobFinalizado'])
  }

  mercadoPago() {
    this.metodoPago = 1;
  }

  transferencia() {
    this.metodoPago = 2;
  }

  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 3000,
    });
  }

  mostarPago(elemento:Pago){
    this.elementoSeleccion=elemento
    this.mostarDetalles=true
    this.mostarAdd=false
  }
}
