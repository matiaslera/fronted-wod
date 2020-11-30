import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profesional } from 'src/app/domain/profesional';
import { Turno } from 'src/app/domain/turno';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';

@Component({
  selector: 'app-tuno-item',
  templateUrl: './tuno-item.component.html',
  styleUrls: ['./tuno-item.component.css']
})
export class TunoItemComponent implements OnInit {

  @Input() item: Turno;
  @Input() estado: String;
  @Input() imagen: String;
  profesional:Profesional
  constructor(
  public dialog: MatDialog,
    public authServ: AuthUserService,
    public perfilSer:ProfileService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(this.item.idProfesional)
    this.profesional= await this.perfilSer.getIdProfesional(this.item.idProfesional)
  }
/* 
  respuesta() {
    const dialogRef = this.dialog.open(JobRespuestaComponent, {
      height: '600px',
      width: '700px',
      hasBackdrop: false,
      panelClass: 'custom-dialog-container',
      data: { presupuesto: this.consulta },
    });
  }

  info() {
    const dialogRef = this.dialog.open(JobContatarComponent, {
      height: '600px',
      width: '700px',
      hasBackdrop: false,
      panelClass: 'custom-dialog-container',
      data: { presupuesto: this.consulta,estado:this.estado },
    });
  }
  
  pagar(){
    this.dialog.open(PayJobComponent, {
      height: '400px',
      width: '650px',
      hasBackdrop: false,
      panelClass: 'custom-dialog-container',
      data: { presupuesto: this.consulta,estado:this.estado },
    });
  } */

  estaContratado(){
    return this.estado==="pendiente"
  }

  estaPublicado(){
    return this.estado==="publicado"
  }

  esCliente(): boolean {
    return this.authServ.getTipo() === 'CLIENTE';
  }

  esProfesional(): boolean {
    return this.authServ.getTipo() === 'PROFESIONAL';
  }

}
