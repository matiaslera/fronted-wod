import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Trabajo } from 'src/app/domain/trabajo';
import { JobDetallesComponent } from '../job-detalles/job-detalles.component';
import { JobRespuestaComponent } from '../job-respuesta/job-respuesta.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  @Input() esConsulta: Boolean
  @Input() consulta: Trabajo
  @Input() imagen:String
  constructor(/* private jobService: PresupuestoService, */ private route: ActivatedRoute,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  respuesta(){
    const dialogRef = this.dialog.open(JobRespuestaComponent, {
      height: '600px',
      width: '700px',
      hasBackdrop: false,
      panelClass: 'custom-dialog-container',
      data: {presupuesto:this.consulta} })
    //ingresar a una nueva pagina con los detalles del trabajo
    //donde me salga para aceptar o cancelar
  }

  estaContratado(){
   // return this.consulta.contratado && !this.consulta.realizado
  }

  estaFinalizado(){
  //  return this.consulta.contratado && this.consulta.realizado
  }
 


}
