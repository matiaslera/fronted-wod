import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/domain/cliente';
import { Pago } from 'src/app/domain/pago';
import { Profesional } from 'src/app/domain/profesional';
import { Trabajo } from 'src/app/domain/trabajo';
import { DialogTurno, Estado, Turno } from 'src/app/domain/turno';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { TunoItemComponent } from '../tuno-item/tuno-item.component';
import { TurnPayComponent } from '../turn-pay/turn-pay.component';

@Component({
  selector: 'app-turn-popup',
  templateUrl: './turn-popup.component.html',
  styleUrls: ['./turn-popup.component.css']
})
export class TurnPopupComponent implements OnInit {

  cliente:Cliente = new Cliente()
  profesional:Profesional = new Profesional()
  turno:Turno = new Turno()
  trabajo:Trabajo 

  constructor(
    public authServ: AuthUserService,
    private perfilSer:ProfileService,
    public dialogRef: MatDialogRef<TunoItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogTurno,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public trabajoSer:TrabajoService,
    public router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    console.log('data:', this.data);
    console.log('turno:', this.data.turno);
    this.turno=this.data.turno
    this.profesional= await this.perfilSer.getIdProfesional(this.turno.idProfesional)
    this.cliente= await this.perfilSer.getIdCliente(this.turno.idCliente)
    console.log(this.tieneMediosPago())
  }



  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 3000,
    });
  }

  esCliente(): boolean {
    return this.authServ.getTipo() === 'CLIENTE';
  }

  esProfesional(): boolean {
    return this.authServ.getTipo() === 'PROFESIONAL';
  }

  cancelarTurno(){
    this.turno.estado=Estado.CANCELADO
    this.trabajoSer.actualizarTurno(this.turno)
    this.mensaje("se cancelo el turno, ingrese en nuevo si quiere generar otro")
    this.dialogRef.close()
    this.router.navigate['turnos'];
  }

  confirmarTurno(){
    this.turno.estado=Estado.CONTRATADO
    this.trabajoSer.actualizarTurno(this.turno)
    this.mensaje("se confirmo el turno")
    this.dialogRef.close()
    this.router.navigate['turnos'];
  }
  
  finalizarTurno(){
    console.log("se finalizo")
    this.dialog.open(TurnPayComponent, {
      height: '400px',
      width: '650px',
      hasBackdrop: false,
      panelClass: 'custom-dialog-container',
      data: { trabajo: this.trabajo,turno:this.turno, profesional:this.profesional,cliente:this.cliente },
    });
    /* trabajo: Trabajo;
  turno:Turno;
  profesional:Profesional
  cliente:Cliente */
    /* this.turno.estado=Estado.FINALIZADO
    this.trabajoSer.actualizarTurno(this.turno)
    this.dialogRef.close()
    this.router.navigate['turnos']; */
  }
  estaCancelado():boolean{
   return this.turno.estado===Estado.CANCELADO
  }

  estaContratado():boolean{
    return this.turno.estado===Estado.CONTRATADO
   }

   estaPublicado():boolean{
    return this.turno.estado===Estado.PUBLICADO
   }

   estaFinalizado(){
    return this.turno.estado===Estado.FINALIZADO
   }

  tieneMediosPago():boolean{
    console.log("medios de pagos",this.profesional.mediosPagos.length)
    return this.profesional.mediosPagos.length>0
  }

  sePuedeConfirmar(){
    return !this.estaContratado() && !this.estaCancelado() && this.esProfesional() && this.tieneMediosPago()
   
  }
  cancelar(){
    this.dialogRef.close()
  }

  
}
//Agregar los mensajes de accion