import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Trabajo } from 'src/app/domain/trabajo';
import { JobDetallesComponent } from '../job-detalles/job-detalles.component';

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

  ver(){
    const dialogRef = this.dialog.open(JobDetallesComponent, {
      height: '600px',
      width: '700px',
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
