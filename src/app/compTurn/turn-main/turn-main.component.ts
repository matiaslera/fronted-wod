import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profesional } from 'src/app/domain/profesional';
import { Turno } from 'src/app/domain/turno';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';

@Component({
  selector: 'app-turn-main',
  templateUrl: './turn-main.component.html',
  styleUrls: ['./turn-main.component.css']
})
export class TurnMainComponent implements OnInit {

  nuevoTurno:boolean=false;
  proximoTurno:boolean;
  previosTurno:boolean;
  turnos:Turno[]=[]
  turnosBd:Turno[];
  profesional:Profesional

  constructor(
    public authServ: AuthUserService,
    public dialog: MatDialog,
    public perfilServ: ProfileService,
    public trabajoServ:TrabajoService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.esProfesional()) {
      this.profesional = await this.perfilServ.getIdProfesional(parseInt(this.authServ.getId(),10))
      this.turnosBd= await this.trabajoServ.turnosProfesional(parseInt(this.authServ.getId(),10))
      console.log("clienteeeeeeeeeeee",this.turnosBd)
     }
    if (this.esCliente()) {
      //this.profesional = await this.perfilServ.getIdProfesional(parseInt(this.authServ.getId(),10))
      this.turnosBd= await this.trabajoServ.turnosClientes(parseInt(this.authServ.getId(),10))
      console.log("profesionalllll",this.turnosBd)
     }
  }

  esCliente(): boolean {
    return this.authServ.getTipo() === 'CLIENTE';
  }

  esProfesional(): boolean {
    return this.authServ.getTipo() === 'PROFESIONAL';
  }

  nuevo(){
    this.nuevoTurno=true
    this.proximoTurno=false
    this.previosTurno=false
  }

  proximo(){
    var fechauno = new Date();
    if(this.turnosBd.length>0){
      this.turnos=this.turnosBd.filter(turnosCargado=>turnosCargado.fechaTrabajo>=fechauno)
    }
    this.nuevoTurno=false
    this.proximoTurno=true
    this.previosTurno=false
  }

  previo(){
    var fechauno = new Date();
    if(this.turnosBd.length>0){
      this.turnos=this.turnosBd.filter(turnosCargado=>turnosCargado.fechaTrabajo<=fechauno)
    }
    this.nuevoTurno=false
    this.proximoTurno=false
    this.previosTurno=true
  }
  
  cancelarAll(falso:boolean){
    this.nuevoTurno=falso
    this.proximoTurno=falso
    this.previosTurno=falso
  }

}
