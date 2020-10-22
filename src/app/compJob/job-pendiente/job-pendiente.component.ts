import { Component, OnInit } from '@angular/core';
import { Presupuesto } from 'src/app/domain/presupuesto';
import { Usuario } from 'src/app/domain/user';
import { ProfileService } from 'src/app/services/perfil/profile.service';

@Component({
  selector: 'app-job-pendiente',
  templateUrl: './job-pendiente.component.html',
  styleUrls: ['./job-pendiente.component.css']
})
export class JobPendienteComponent implements OnInit {

  usuario: Usuario= new Usuario
  trabajos: Presupuesto[]=[];
  imagen= "../../assets/pendiente.jpg"
  constructor(/* public trabajosServices: PresupuestoService */private profileService: ProfileService) {
    this.updateTrabajos()
   }

  ngOnInit():void {
  }

  async getTrabajosClientes(){
    try{
    //this.trabajos=await  this.trabajosServices.consultas()
    console.log(this.trabajos)    
  } catch{
     console.log('error en cargar lista clientes')
   }
  }

  async getTrabajosTecnicos(){
    try{
      //this.usuario =(await this.profileService.getProf())
      console.log(this.trabajos)    
      console.log( this.usuario)
    //this.trabajos=await  this.trabajosServices.especialidad(this.usuario)
  } catch{
     console.log('error en cargar lista de tecnicos')
   }
  }

  noTieneTrabajos(){
    return this.trabajos.length ===0
  }

  updateTrabajos(){
    if(this.esProfesional()){
      console.log('es profesional: ',this.esProfesional())
      this.getTrabajosTecnicos()
    }else{     
      console.log('es cliente: ', this.esProfesional())
      this.getTrabajosClientes()
    }
  }

  esCliente():boolean{
    return false
    ///this.profileService.tipo()
   // return this.profileService.esCliente
  }

  esProfesional():boolean{
     
      if (this.profileService.esCliente){
        return false
      }
      return true
  }

}
