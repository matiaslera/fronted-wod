import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/domain/cliente';
import { Profesional } from 'src/app/domain/profesional';
import { Trabajo } from 'src/app/domain/trabajo';
import { Usuario } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';

@Component({
  selector: 'app-job-pendiente',
  templateUrl: './job-pendiente.component.html',
  styleUrls: ['./job-pendiente.component.css']
})
export class JobPendienteComponent implements OnInit {

  usuario: Usuario= new Usuario
  trabajos: Trabajo[]=[];
  cliente:Cliente
  profesional:Profesional
  imagen= "../../assets/pendiente.jpg"
  constructor( public trabajosServices: TrabajoService, private profileService: ProfileService, public authServ: AuthUserService) {
  }
  
  ngOnInit():void {
    this.updateTrabajos()
  }

  async getTrabajosClientes(){
    try{
    this.cliente=  this.authServ.getCurrentCliente();
    this.trabajos=await  this.trabajosServices.trabajoPublicado(this.cliente.id)
    //console.log(this.trabajos)    
  } catch{
     console.log('error en cargar lista clientes')
   }
  }

  async getTrabajosTecnicos(){
    try{
      this.trabajos=[]
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
      console.log('es cliente: ', this.esCliente())
      this.getTrabajosClientes()
    }
  }

  esCliente():boolean{
   return this.authServ.getTipo() === 'CLIENTE'
  }

  esProfesional():boolean{
    console.log('estoy en LOCAL STORAGE- PROFESIONAL:', this.authServ.getCurrentProfesional());
     return this.authServ.getTipo() === 'PROFESIONAL' 
  }

}
