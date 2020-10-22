import { Component, OnInit } from '@angular/core';
import { Presupuesto } from 'src/app/domain/presupuesto';

@Component({
  selector: 'app-job-finalizado',
  templateUrl: './job-finalizado.component.html',
  styleUrls: ['./job-finalizado.component.css']
})
export class JobFinalizadoComponent implements OnInit {

  
  trabajos: Presupuesto[] = []
  imagen= "../../assets/terminado.jpg"
  constructor(/* public trabajoServices: PresupuestoService */) { }

  ngOnInit() {
    this.getTrabajos()
    console.log(this.trabajos)
  }

  async getTrabajos(){
    try{
   // this.trabajos=await  this.trabajoServices.trabajosTerminado()
  } catch{
     console.log('error en cargar lista')
   }
  }

  noTieneTrabajos(){
    return this.trabajos.length ===0
  }

}
