import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Oferta } from 'src/app/domain/oferta';
import { Profesional } from 'src/app/domain/profesional';
import { Trabajo } from 'src/app/domain/trabajo';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { JobComponent } from '../job/job.component';

@Component({
  selector: 'app-job-respuesta',
  templateUrl: './job-respuesta.component.html',
  styleUrls: ['./job-respuesta.component.css'],
})
export class JobRespuestaComponent implements OnInit {
  ofertaJob: Oferta = new Oferta();
  jobData: Trabajo = new Trabajo();
  id: number;
  profesional:Profesional= new Profesional()
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<JobComponent>,
    public authServ: AuthUserService,
    private snackBar: MatSnackBar,
    private trabajoSer: TrabajoService,
    public profileServ:ProfileService,
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(this.data.presupuesto);
    console.log(this.data.presupuesto.id);
    this.profesional = await this.profileServ.getIdProfesional(parseInt(this.authServ.getId(),10))
    this.jobData= await this.trabajoSer.trabajoFull(this.data.presupuesto.id) 
  }

  get trabajo(){
    return this.data.presupuesto
  }
  get presupuesto(){
    return this.data.presupuesto.presupuesto
  }

  async aceptar() {
    try {
      this.ofertaJob.idProfesional = this.profesional.id
      this.ofertaJob.nombreProf= this.profesional.usuario.nombre
      this.ofertaJob.apellidoProf = this.profesional.usuario.apellido
      this.ofertaJob.especialidad=this.data.presupuesto.presupuesto.especialidad
      this.trabajoSer.nuevaOferta(this.ofertaJob,this.data.presupuesto.id)
      this.mensaje('se a enviado la respuesta del trabajo ')
      console.log('se a enviado la respuesta del trabajo ');
    } catch (e) {
      console.log('no se puedo enviar la oferta ', e);
    }
    this.dialogRef.close();
  }

  cancelar() {
    console.log('este dialog se esta cerrando');
    this.dialogRef.close();
  }

  respondido(){
   return this.jobData.presupuesto.ofertas.filter((oferta)=>oferta.idProfesional=== parseInt(this.authServ.getId(), 10)).length>0
  }

  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 3000,
    });
  }
}
