import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogJob, PagoInterface } from 'src/app/domain/oferta';
import { Pago } from 'src/app/domain/pago';
import { Profesional } from 'src/app/domain/profesional';
import { Estado, Trabajo } from 'src/app/domain/trabajo';
import { Turno } from 'src/app/domain/turno';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { TurnPopupComponent } from '../turn-popup/turn-popup.component';

@Component({
  selector: 'app-turn-pay',
  templateUrl: './turn-pay.component.html',
  styleUrls: ['./turn-pay.component.css']
})
export class TurnPayComponent implements OnInit {

  profesional: Profesional = new Profesional();
  metodoPago: number;
  turno:Turno = new Turno()
  trabajo:Trabajo 
  mediosPagos:Pago[]
  mostarAdd:boolean=false
  mostarDetalles:boolean=false
  elementoSeleccion:Pago
  
  constructor(
    public dialogRef: MatDialogRef<TurnPopupComponent>,
    private perfil: ProfileService,
    private trabajoServ: TrabajoService,
    @Inject(MAT_DIALOG_DATA) public data: PagoInterface,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.updateData();
    console.log('data:', this.data);;
    console.log('presupuesto:', this.data.trabajo);
    this.profesional= this.data.profesional
    this.mediosPagos=this.profesional.mediosPagos
    this.turno=this.data.turno
  }

  get presupuesto() {
    return this.data.trabajo.presupuesto;
  }

  async updateData() {
    if (this.estaContratado()) {
      this.profesional = await this.perfil.getIdProfesional(
        this.data.trabajo.idProfesional
      );
    }
  }

  cancelar() {
    console.log('The dialog esta cerrado');
    this.dialogRef.close();
  }

  sinContratar() {
    return this.data.trabajo.estado === Estado.PUBLICADO;
  }
  estaContratado() {
    return this.data.trabajo.estado === Estado.CONTRATADO;
  }
  estaFinalizado() {
    return this.data.trabajo.estado === Estado.FINALIZADO;
  }

  async finalizar() {
    try {
      this.data.trabajo.estado = Estado.FINALIZADO;
      this.profesional.trabajos.push(this.data.trabajo)
      await this.trabajoServ.update(this.data.trabajo);
      this.perfil.actualizarProfesional(this.profesional);
      this.router.navigate(['/jobPendientes'])
      this.mensaje('Se ha finalizado el trabajo');
    } catch (e) {
      e.error;
    }
    console.log('The dialog rechazo finalizar la consulta');
    this.dialogRef.close();
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

  agregar(){
    this.mostarAdd=true
    this.mostarDetalles=false
    this.elementoSeleccion=null
  }

  mostarPago(elemento:Pago){
    this.elementoSeleccion=elemento
    this.mostarDetalles=true
    this.mostarAdd=false
  }

  eliminarSeleccionado(){
    //this.perfilSer.eliminarMetodoDePago(this.profesional.id,this.elementoSeleccion)
    this.mensaje("se elimino el medio de pago "+ this.elementoSeleccion.nombreEntidad + " de "+ this.profesional.usuario.nombre)
    this.elementoSeleccion=null
    this.mostarDetalles=false
    this.mostarAdd=false
    this.router.navigate['formaDePago'];
  }
}
