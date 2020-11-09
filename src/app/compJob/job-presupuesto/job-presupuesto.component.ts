import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/domain/cliente';
import { Oferta } from 'src/app/domain/oferta';
import { Profesional } from 'src/app/domain/profesional';
import { Trabajo } from 'src/app/domain/trabajo';
import { Usuario } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { JobComponent } from '../job/job.component';

@Component({
  selector: 'app-job-presupuesto',
  templateUrl: './job-presupuesto.component.html',
  styleUrls: ['./job-presupuesto.component.css']
})
export class JobPresupuestoComponent implements OnInit {

  usuario: Usuario= new Usuario
  trabajos: Trabajo[]=[]
  cliente:Cliente
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
    this.trabajos=await this.trabajosServices.trabajoPublicado(this.cliente.id) 
    console.log(this.trabajos)
  } catch{
     console.log('error en cargar lista clientes')
   }
  }

  async getTrabajosTecnicos(){
    try{
      this.trabajos=await this.trabajosServices.trabajoPorEsp(this.profesional)
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

  async tieneProfesion(){
    debugger
    this.profesional= await this.perfilServ.getIdProfesional(parseInt(this.authServ.getId(),10))
    console.log(this.profesional.profesion!==null )
    return this.profesional.profesion!==null 
  }

  async aceptar(){
    console.log(this.profesional.id)
    this.profesional= await this.perfilServ.getIdProfesional(parseInt(this.authServ.getId(),10))
    this.profesional.profesion=this.opcion
    this.perfilServ.actualizarProfesional(this.profesional)
  }
 // this.usuarioBDatos = await this.perfilSer.getIdCliente(parseInt(this.authServ.getId(),10)) ;
   //   this.usuarioBDatos = await this.perfilSer.getIdProfesional(parseInt(this.authServ.getId(),10))
}
