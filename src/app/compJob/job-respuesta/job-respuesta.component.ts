import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Oferta } from 'src/app/domain/oferta';
import { Presupuesto } from 'src/app/domain/presupuesto';

@Component({
  selector: 'app-job-respuesta',
  templateUrl: './job-respuesta.component.html',
  styleUrls: ['./job-respuesta.component.css']
})
export class JobRespuestaComponent implements OnInit {

  ofertaJob: Oferta = new Oferta
  jobData: Presupuesto= new Presupuesto
  id:number
  constructor(private router: Router, private route: ActivatedRoute/* private jobService: PresupuestoService,private user:LoginService */) { }

  ngOnInit():void {
    this.route.params.subscribe(routeParams => {
      this.id=routeParams.id
      console.log(routeParams.id)
      this.loadJob(routeParams.id)      
    })
    this.cargarData()
    console.log(this.ofertaJob)
  }

  async loadJob(id){
    //this.jobData = await this.jobService.trabajoCompleto(id)
    console.log(this.jobData)
  }

  cargarData(){
    this.ofertaJob.fechaCreada=new Date()
    /* this.ofertaJob.especialidad=this.user.getUser().especialidad
    this.ofertaJob.nombreApellido= this.user.getUser().nombreyApellido
    this.ofertaJob.idProfesional=this.user.getUserLoggedId() */
  }

  async aceptar(){
    try{
      this.loadJob(this.id)
      //this.jobService.answerConsulta(this.ofertaJob,this.id)
      this.router.navigate(['home/trabajoPendiente'])
      console.log('se a enviado la respuesta del trabajo ', )
    }catch(e){
      console.log('no se puedo enviar la oferta ', e)
    }
  }

  cancelar(){
    this.router.navigate(['home/trabajoPendiente'])
  }

}
