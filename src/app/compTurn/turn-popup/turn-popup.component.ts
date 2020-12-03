import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/domain/cliente';
import { Pago } from 'src/app/domain/pago';
import { Profesional } from 'src/app/domain/profesional';
import { DialogTurno, Estado, Turno } from 'src/app/domain/turno';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { TunoItemComponent } from '../tuno-item/tuno-item.component';

@Component({
  selector: 'app-turn-popup',
  templateUrl: './turn-popup.component.html',
  styleUrls: ['./turn-popup.component.css']
})
export class TurnPopupComponent implements OnInit {

  cliente:Cliente = new Cliente()
  profesional:Profesional = new Profesional()
  turno:Turno = new Turno()

  formularioPago: FormGroup = this.formularioFB.group(
    {
      nombreEntidad: ['', Validators.required],
      cbu: ['', Validators.required],
      alias: ['', [Validators.required,Validators.minLength(4)]],
      nombreCuenta: ['', [Validators.required]],
      numeroCuenta: [ '',[Validators.required]],
    },
  );
/*   public id?: number,
    public idProfesional?: number,
    public nombreEntidad?: string,
    public cbu?: string,
    public alias?: string,
    public nombreCuenta?: string,
    public numeroCuenta?: number,
    public montoAprox?: number */

  constructor(
    public authServ: AuthUserService,
    private perfilSer:ProfileService,
    public dialogRef: MatDialogRef<TunoItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogTurno,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public trabajoSer:TrabajoService,
    public router: Router,
    private formularioFB: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    console.log('data:', this.data);
    console.log('turno:', this.data.turno);
    this.turno=this.data.turno
    this.profesional= await this.perfilSer.getIdProfesional(this.turno.idProfesional)
    this.cliente= await this.perfilSer.getIdCliente(this.turno.idCliente)
  }

  get nombreEntidad() {
    return this.formularioPago.get('nombreEntidad');
  }

  get cbu() {
    return this.formularioPago.get('cbu');
  }

  get alias() {
    return this.formularioPago.get('alias');
  }

  get nombreCuenta() {
    return this.formularioPago.get('nombreCuenta');
  }

  get numeroCuenta() {
    return this.formularioPago.get('numeroCuenta');
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
    return this.profesional.mediosPagos.length>0
  }

  sePuedeConfirmar(){
    return !this.estaContratado() && !this.estaCancelado() && this.esProfesional() && this.tieneMediosPago()
   
  }
  cancelar(){
    this.dialogRef.close()
  }

  addMedioPago(){
    const medioPago = new Pago()
    medioPago.idProfesional=this.profesional.id
    medioPago.nombreCuenta=this.nombreCuenta.value
    medioPago.nombreEntidad=this.nombreEntidad.value
    medioPago.alias=this.alias.value
    medioPago.cbu=this.cbu.value
    medioPago.numeroCuenta=this.numeroCuenta.value
    this.profesional.mediosPagos.push(medioPago)
    this.perfilSer.actualizarProfesional(this.profesional)
    this.mensaje("se acutalizo los medios de pago de "+ this.profesional.usuario.nombre)
  }
}
//Agregar los mensajes de accion