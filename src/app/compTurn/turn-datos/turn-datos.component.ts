import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from 'src/app/domain/direccion';
import { Profesional } from 'src/app/domain/profesional';
import { Trabajo } from 'src/app/domain/trabajo';
import { Estado, Turno } from 'src/app/domain/turno';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';

@Component({
  selector: 'app-turn-datos',
  templateUrl: './turn-datos.component.html',
  styleUrls: ['./turn-datos.component.css']
})
export class TurnDatosComponent implements OnInit {

  profesional: Profesional
  motivo:string
  direccion:Direccion = new Direccion()
  idProfesional:number
  idCliente:number
  fecha:Date=new Date()

  motivos: string[] = [
    'Mantenimiento',
    'Consulta Tecnica',
    'Presupuesto',
  ];
  turnoElegido:string

  formularioTurno: FormGroup = this.formularioFB.group(
    {
      provincia: ['', Validators.required],
      ciudad: ['', Validators.required],
      codPostal: ['', [Validators.required,Validators.minLength(4)]],
      calle: ['', [Validators.required]],
      altura: [ '',[Validators.required]],
      pisoDep:[''],
      fechaForm:['',Validators.required],
      horaForm:['',Validators.required],
      motivoForm:[''],
    },
  );
  constructor( private jobService: TrabajoService,  private route: ActivatedRoute,public dialog: MatDialog, public perfilServ:ProfileService, private router: Router,
    public authServ: AuthUserService, 
    private formularioFB: FormBuilder,) { 
    console.log(jobService.motivoTurno)
    this.motivo=jobService.motivoTurno
    if(this.motivo!==''){
      this.formularioTurno.patchValue({
        motivoForm:this.motivo,
      });
    }
  }

  ngOnInit():void {
    this.route.params.subscribe(routeParams => {
      this.loadJob(routeParams.id)     
      this.idProfesional=routeParams.id 
    })
    if (this.authServ.getTipo() === 'CLIENTE') {
      this.idCliente = parseInt(this.authServ.getId(),10) ;
    } 
  } 

  get provincia() {
    return this.formularioTurno.get('provincia');
  }
  get ciudad() {
    return this.formularioTurno.get('ciudad');
  }
  get codPostal() {
    return this.formularioTurno.get('codPostal');
  }
  get calle() {
    return this.formularioTurno.get('calle');
  }
  get altura() {
    return this.formularioTurno.get('altura');
  }
  get pisoDep(){
    return this.formularioTurno.get('pisoDep');
  }
  get fechaForm(){
    return this.formularioTurno.get('fechaForm');
  }
  get horaForm(){
    return this.formularioTurno.get('horaForm');
  }
 /*  get turnoForm(){
    return this.formularioTurno.get('turnoForm');
  } */
  get motivoForm(){
    return this.formularioTurno.get('motivoForm');
  }

  async loadJob(id){
    this.profesional = await this.perfilServ.getIdProfesional(id)
    console.log(this.profesional)
  }

  cargarCliente(){
      this.profesional.profesion
  }

  contratar(){
    var nuevoTurno = new Turno()
    nuevoTurno.idProfesional=this.idProfesional
    nuevoTurno.idCliente=this.idCliente
    this.direccion.provincia=this.provincia.value
    this.direccion.ciudad=this.ciudad.value
    this.direccion.codPostal=this.codPostal.value
    this.direccion.calle=this.calle.value
    this.direccion.altura=this.altura.value
    this.direccion.pisoDep=this.pisoDep.value
    nuevoTurno.motivos=this.motivoForm.value
    nuevoTurno.direccion=this.direccion
    nuevoTurno.estado=Estado.PUBLICADO
    nuevoTurno.fechaTrabajo=new Date(this.fechaForm.value)
    const palabra = this.horaForm.value.toString()
    const lista = palabra.split(':')
    const ab=lista[0]
    const bc=lista[1]
    console.log(ab)
    console.log(bc)
    nuevoTurno.hora= parseInt(ab,10)
    nuevoTurno.minutos=parseInt(bc,10)
    console.log(nuevoTurno.hora)
    console.log(nuevoTurno.minutos)
    this.jobService.crearTurno(nuevoTurno)
    this.router.navigate(['/turnos'])
  }
  
  cancelar(){
    console.log("apretee cancelar")
    this.router.navigate(['/turnos'])
  }

  onSubmit() {
    var act = document.activeElement.id;
    console.log(document.activeElement.id);
    if (act == 'contratar') {
      this.contratar();
    }
    if (act == 'cancelar') {
      this.cancelar()
    }
  }

}
