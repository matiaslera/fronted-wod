import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Trabajo } from 'src/app/domain/trabajo';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { JobContatarComponent } from '../job-contatar/job-contatar.component';
import { JobRespuestaComponent } from '../job-respuesta/job-respuesta.component';
import { PayJobComponent } from '../pay-job/pay-job.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  @Input() estado: String;
  @Input() consulta: Trabajo;
  @Input() imagen: String;
  constructor(
  public dialog: MatDialog,
    public authServ: AuthUserService,  private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

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

  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 3000,
    });
  }

}
