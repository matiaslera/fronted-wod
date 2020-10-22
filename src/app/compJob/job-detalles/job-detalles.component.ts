import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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

  jobData: Presupuesto=new Presupuesto()
  id
  constructor(/* private jobService: PresupuestoService, */ private route: ActivatedRoute,private router: Router,public dialog: MatDialog,private user:ProfileService) { }

  ngOnInit():void {
    this.route.params.subscribe(routeParams => {
      this.loadJob(routeParams.id)      
    })
  } 

  async loadJob(id){
   // this.jobData = await this.jobService.trabajoCompleto(id)
   // console.log(this.jobData)
  }

  contratar(ofertaSeleccionada:Oferta){
    const dialogRef = this.dialog.open(PopupPresupuestoComponent, {
      height: '600px',
      width: '700px',
      data: {presupuesto:this.jobData,
        oferta:ofertaSeleccionada} })
   // this.router.navigate(['home/contrato'])
    //ingresar a una nueva pagina con los detalles del trabajo
    //donde me salga para aceptar o cancelar
  }

  getId(){
    //return this.user.getUserLoggedId()
  }

  userName(){
  //  if(this.user.getUser()===undefined){
    //  return this.user.getUser().nombreyApellido
  
  }

}
