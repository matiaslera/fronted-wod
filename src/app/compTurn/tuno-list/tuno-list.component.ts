import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/domain/cliente';
import { Profesional } from 'src/app/domain/profesional';
import { Turno } from 'src/app/domain/turno';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';

@Component({
  selector: 'app-tuno-list',
  templateUrl: './tuno-list.component.html',
  styleUrls: ['./tuno-list.component.css']
})
export class TunoListComponent implements OnInit {

  @Input() turnos:Turno[];
  imagen = '../../assets/pendiente.jpg';
  opcion:string;
  profesional:Profesional
  cliente:Cliente;
  especialidad: string[] = [
    'Electricidad',
    'Plomeria',
    'Herreria',
    'Gasista',
    'Carpinteria',
    'Pintor',
    'Armado en Seco',
  ];
  constructor(
    public authServ: AuthUserService,
    public dialog: MatDialog,
    public perfilServ: ProfileService,
    public trabajoServ:TrabajoService,
    public router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.esProfesional()) {
      this.profesional = await this.perfilServ.getIdProfesional(parseInt(this.authServ.getId(),10))
      //this.turnosBd= await this.trabajoServ.turnosProfesional(parseInt(this.authServ.getId(),10))
      console.log("profesionallll",this.profesional)
     }
    if (this.esCliente()) {
      this.cliente = await this.perfilServ.getIdCliente(parseInt(this.authServ.getId(),10))
      //this.turnosBd= await this.trabajoServ.turnosClientes(parseInt(this.authServ.getId(),10))
      console.log("clienteee",this.cliente)
     }
  }

  esCliente(): boolean {
    return this.authServ.getTipo() === 'CLIENTE';
  }

  esProfesional(): boolean {
    return this.authServ.getTipo() === 'PROFESIONAL';
  }

  noTieneTurnos(){
    return this.turnos.length===0
  }

  async aceptar(){
    console.log(this.profesional.id);
    this.profesional = await this.perfilServ.getIdProfesional(parseInt(this.authServ.getId(), 10)   );
    this.profesional.profesion = this.opcion;
    this.perfilServ.actualizarProfesional(this.profesional);
    this.router.navigate['turnos'];
  }
}
