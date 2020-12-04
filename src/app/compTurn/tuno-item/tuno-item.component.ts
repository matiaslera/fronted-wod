import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profesional } from 'src/app/domain/profesional';
import { DialogTurno, Estado, Turno } from 'src/app/domain/turno';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { TurnPopupComponent } from '../turn-popup/turn-popup.component';

@Component({
  selector: 'app-tuno-item',
  templateUrl: './tuno-item.component.html',
  styleUrls: ['./tuno-item.component.css']
})
export class TunoItemComponent implements OnInit {

  @Input() item: Turno;
  @Input() estado: String;
  @Input() imagen: String;
  profesional:Profesional=new Profesional();
  claseEstado:string;
  
  constructor(
    private perfilSer:ProfileService,
    public authServ: AuthUserService,
    public dialog: MatDialog,
  ) {}

  async ngOnInit(): Promise<void> {
    this.cambioDeEstado()
    this.profesional= await this.perfilSer.getIdProfesional(this.item.idProfesional)
  }
 
  respuesta() {
  /*   const dialogRef = this.dialog.open(JobRespuestaComponent, {
      height: '600px',
      width: '700px',
      hasBackdrop: false,
      panelClass: 'custom-dialog-container',
      data: { presupuesto: this.consulta },
    }); */
  }

  info() {
    const dialogRef = this.dialog.open(TurnPopupComponent, {
      height: '600px',
      width: '700px',
      hasBackdrop: false,
      panelClass: 'custom-dialog-container',
      data: { turno: this.item },
    });
  }
  
  pagar(){
/*     this.dialog.open(PayJobComponent, {
      height: '400px',
      width: '650px',
      hasBackdrop: false,
      panelClass: 'custom-dialog-container',
      data: { presupuesto: this.consulta,estado:this.estado },
    }); */
  } 

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

  cambioDeEstado(){
    if(this.item.estado===Estado.PUBLICADO){
      this.claseEstado="bordes_publicado"
    }
    if(this.item.estado===Estado.CONTRATADO){
      this.claseEstado="bordes_respondido"
    }
    if(this.item.estado===Estado.FINALIZADO){
      this.claseEstado="bordes_finalizado"
    }
    if(this.item.estado===Estado.CANCELADO){
      this.claseEstado="bordes_cancelado"
    }
  }

}
