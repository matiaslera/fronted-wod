import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/domain/user';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from '../auth/auth-user.service';
import { REST_SERVER_URL } from '../routes';
import { isUndefined } from 'util';
import { of } from 'rxjs/internal/observable/of';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profesionales:Usuario[]
  clientes:Usuario[]
  esCliente:boolean
  usuario: User

  constructor(private httpCLient: HttpClient,private authServ:AuthUserService) { 
    this.update()
    this.tipo()
  }

  ngOnInit(): void {
  }

  /*Creacion de un usuario*/
  
  /*Modificacion de un usuario*/
  
  /*Actualizar un dato del usuario*/

  /*Eliminar un usuario o su dato*/ 
  async getFullProfile(id:String ) {
    return of (await this.httpCLient.get<Usuario>(REST_SERVER_URL + '/perfil_completo/' +id).toPromise())
  }

  async getProfesionales(): Promise<Usuario[]> {
     const profesionales2= (await this.httpCLient.get<Usuario[]>(REST_SERVER_URL + '/profesionales').toPromise())
    return  profesionales2.map((pres) => Usuario.fromJson(pres))
  }

  async getClientes( ): Promise<Usuario[]> {
      const clientes2= await this.httpCLient.get<Usuario[]>(REST_SERVER_URL + '/clientes').toPromise()
     return clientes2.map((pres) => Usuario.fromJson(pres))
  }
  async update(){
    this.clientes=await this.getClientes()
    this.profesionales=await this.getProfesionales()
   // console.log(this.clientes.length)
   // console.log(this.profesionales.length)
  }

/* async getProf(): Promise<Usuario> {
    return (await this.httpCLient.get<Usuario>(REST_SERVER_URL + '/profesional/'+this.getUser().id).toPromise())
 }

 async getCliente(): Promise<Usuario> {
 return (await this.httpCLient.get<Usuario>(REST_SERVER_URL + '/cliente/'+this.getUser().id).toPromise())
}  */

 async getProfesional(id:number){
  const json= await this.httpCLient.get<Usuario>(REST_SERVER_URL + '/profesional/'+id).toPromise();
  console.log(json)
  return   Usuario.fromJson(json)
 }

  tipo(){
    if(!isUndefined(this.clientes)){
    /*  var listCli =this.clientes.filter(a=>a.id==this.user.getUser().id) 
      if(listCli.length!==0){
     this.esCliente=true
    }  */
    }
    if(!isUndefined(this.profesionales)){
      /*  var listPro =this.profesionales.filter(a=>a.id==this.user.getUser().id) 
       if(listPro.length!==0){
         this.esCliente=false
    
        }  */
    }
   }
  
   esProfesional():boolean{
     return !this.esCliente
   }

   numClientes():number{
          return this.profesionales.length
   }

   numProfe():number{
    return  this.clientes.length
  }

}
