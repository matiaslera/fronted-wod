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
  trabajos: Trabajo[]=[]
  cliente:Cliente
  pendiente:String="pendiente"
  profesional:Profesional = new Profesional()
  opcion:string;
  especialidad: string[] = [
    'Electricidad',
    'Plomeria',
    'Herreria',
    'Gasista',
    'Carpinteria',
    'Pintor',
    'Armado en Seco',
  ];
  imagen= "../../assets/pendiente.jpg"
  constructor( public trabajosServices: TrabajoService, public authServ: AuthUserService,public perfilServ: ProfileService) {
  }
  
  async ngOnInit():Promise<void> {
    if (this.authServ.getTipo() === 'CLIENTE') {
      this.cliente = await this.perfilServ.getIdCliente(parseInt(this.authServ.getId(),10)) ;
      console.log('estoy en LOCAL STORAGE- CLIENTE:');
    }
    if (this.authServ.getTipo() === 'PROFESIONAL') {
     this.profesional = await this.perfilServ.getIdProfesional(parseInt(this.authServ.getId(),10))
      console.log('estoy en LOCAL STORAGE- PROFESIONAL:');
    }
    this.updateTrabajos()
  }

  async getTrabajosClientes(){
    try{
    this.trabajos=await this.trabajosServices.trabajoContatado(this.cliente.id) 
    console.log(this.trabajos)
  } catch{
     console.log('error en cargar lista clientes')
   }
  }

  async getTrabajosTecnicos(){
    try{
      this.trabajos=await this.trabajosServices.trabajoQueMeContrataron(this.profesional.id)
      console.log(this.trabajos)    
  } catch{
     console.log('error en cargar lista de tecnicos')
   }
  }

  noTieneTrabajos(){
    return this.trabajos.length ===0
  }

  updateTrabajos(){
    console.log('es profesional: ',this.esProfesional(),"tiene profesion: ",this.profesional.profesion!==undefined )
    console.log(this.profesional)
    if(this.esProfesional()&& (this.profesional.profesion!==undefined )){
      this.getTrabajosTecnicos()
    }
    if(this.esCliente()){     
      this.getTrabajosClientes()
    }
  }

  esCliente():boolean{
   return this.authServ.getTipo() === 'CLIENTE'
  }

  esProfesional():boolean{
     return this.authServ.getTipo() === 'PROFESIONAL' 
  }


  async aceptar(){
    console.log(this.profesional.id)
    this.profesional= await this.perfilServ.getIdProfesional(parseInt(this.authServ.getId(),10))
    this.profesional.profesion=this.opcion
    this.perfilServ.actualizarProfesional(this.profesional)
  }
}
