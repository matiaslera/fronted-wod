export class Usuario {
	
  
  constructor(public uid?:string,public nombre?:string,public tipo?:Tipo,
    public apellido?:string,public email?:string,public dni?:number,
    public fechaDeNacimiento?:Date,public telefono?:number, public fotoUrl?:string,
    public proveedor?:string) {}

    static fromJson(usuarioJSON): Usuario {
      return Object.assign(new Usuario(), usuarioJSON);
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
/* 
export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}
 */