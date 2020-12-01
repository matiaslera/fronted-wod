import { Component, OnInit } from '@angular/core';
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
  hora:any
  
  turno:string[]=[
    "mañana", 
    "tarde"
  ]
  motivos: string[] = [
    'Mantenimiento',
    'Consulta Tecnica',
    'Presupuesto',
  ];
  turnoElegido:string
  constructor( private jobService: TrabajoService,  private route: ActivatedRoute,public dialog: MatDialog, public perfilServ:ProfileService, private router: Router,
    public authServ: AuthUserService, ) { 
    console.log(jobService.motivoTurno)
    this.motivo=jobService.motivoTurno
  }

  ngOnInit():void {
    this.route.params.subscribe(routeParams => {
      this.loadJob(routeParams.id)     
      this.idProfesional=routeParams.id 
    })
    if (this.authServ.getTipo() === 'CLIENTE') {
      this.idCliente = parseInt(this.authServ.getId(),10) ;
    } 
    console.log(this.hora)
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
    nuevoTurno.direccion=this.direccion
    nuevoTurno.turnoDelDia=this.turnoElegido
    nuevoTurno.estado=Estado.PUBLICADO
    nuevoTurno.fechaTrabajo=this.fecha
    this.jobService.crearTurno(nuevoTurno)
    this.router.navigate(['/turnos'])
    console.log(this.hora)
  }
  
  cancelar(){
    console.log("apretee cancelar")
    this.router.navigate(['/turnos'])
  }

}
