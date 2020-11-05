import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { Trabajo } from 'src/app/domain/trabajo';
import { Oferta } from 'src/app/domain/oferta';
import { Presupuesto } from 'src/app/domain/presupuesto';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { PopupPresupuestoComponent } from '../popup-presupuesto/popup-presupuesto.component';

@Component({
  selector: 'app-job-detalles',
  templateUrl: './job-detalles.component.html',
  styleUrls: ['./job-detalles.component.css']
})
export class JobDetallesComponent implements OnInit {

  jobData: Trabajo=new Trabajo()
  constructor( private jobService: TrabajoService,  private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit():void {
    this.route.params.subscribe(routeParams => {
      this.loadJob(routeParams.id)      
    })
  } 

  async loadJob(id){
    this.jobData = await this.jobService.trabajoFull(id)
    console.log(this.jobData)
  }

  /* contratar(ofertaSeleccionada:Oferta){
    const dialogRef = this.dialog.open(PopupPresupuestoComponent, {
      height: '600px',
      width: '700px',
      data: {presupuesto:this.jobData,
        oferta:ofertaSeleccionada} })
   // this.router.navigate(['home/contrato'])
    //ingresar a una nueva pagina con los detalles del trabajo
    //donde me salga para aceptar o cancelar
  } */

}
