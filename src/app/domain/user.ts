import { Cliente } from './cliente';
import { Profesional } from './profesional';

export class Usuario {
	
  constructor(public uid?:string,public nombre?:string,public tipo?:Tipo,
    public apellido?:string,public email?:string,public dni?:number,
    public telefono?:number, public fotoUrl?:string,
    public proveedor?:string) {}

    static fromJson(usuarioJSON): Usuario {
      return Object.assign(new Usuario(), usuarioJSON,{tipo:usuarioJSON.tipo=="CLIENTE"?Tipo.CLIENTE:Tipo.PROFESIONAL});
      //{tipo:usuarioJSON.tipo=="CLIENTE"?Tipo.CLIENTE:Tipo.PROFESIONAL}
    }
  
    toJSON():any{
      return{
        ...this
      }
    }
}

export enum Tipo {
	CLIENTE,PROFESIONAL
}

export class UserFB{

  constructor(public providerId?:string,public uid?:string,public email?:string,public tipo?:Tipo){}
  static fromJson(usuarioJSON): UserFB {
    return Object.assign(new UserFB(), usuarioJSON,{usuario:Usuario.fromJson(usuarioJSON.usuario)});
  }
  toJSON():any{
    return{...this}
  }
}

export type Calificacion = Cliente | Profesional 
