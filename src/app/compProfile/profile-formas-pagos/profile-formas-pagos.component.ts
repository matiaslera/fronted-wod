import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pago } from 'src/app/domain/pago';
import { Profesional } from 'src/app/domain/profesional';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';

@Component({
  selector: 'app-profile-formas-pagos',
  templateUrl: './profile-formas-pagos.component.html',
  styleUrls: ['./profile-formas-pagos.component.css']
})
export class ProfileFormasPagosComponent implements OnInit {

  profesional:Profesional = new Profesional()
  mostarAdd:boolean=false
  mostarDetalles:boolean=false
  mediosPagos:Pago[]
  elementoSeleccion:Pago
  formularioPago: FormGroup = this.formularioFB.group(
    {
      nombreEntidad: ['', Validators.required],
      cbu: ['', Validators.required,Validators.minLength(22)],
      alias: [''],
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
  constructor(    private formularioFB: FormBuilder,private snackBar: MatSnackBar,private perfilSer:ProfileService,public authServ: AuthUserService,public router: Router) { }

  async ngOnInit(): Promise<void> {
    if(this.esProfesional()){
      this.actualizarLista()
    }
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

  esProfesional(): boolean {
    return this.authServ.getTipo() === 'PROFESIONAL';
  }

  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 3000,
    });
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
    this.perfilSer.agregarMetodoDePago(this.profesional.id,medioPago)
    this.mensaje("se actualizo los medios de pago de "+ this.profesional.usuario.nombre+ " " +this.profesional.usuario.apellido)
    this.mostarAdd=false
    this.mediosPagos=this.profesional.mediosPagos
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
    this.perfilSer.eliminarMetodoDePago(this.profesional.id,this.elementoSeleccion)
    this.mensaje("se elimino el medio de pago "+ this.elementoSeleccion.nombreEntidad + " de "+ this.profesional.usuario.nombre)
    this.elementoSeleccion=null
    this.mostarDetalles=false
    this.mostarAdd=false
    this.actualizarLista()
  }

  tieneMediosPago():boolean{
    console.log("medios de pagos",this.profesional.mediosPagos.length)
    return this.profesional.mediosPagos.length>0
  }

  async actualizarLista(){
    this.profesional= await this.perfilSer.getIdProfesional(parseInt(this.authServ.getId(),10))
    this.mediosPagos=this.profesional.mediosPagos
  }
}
