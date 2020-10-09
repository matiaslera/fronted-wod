export class Usuario {
	
  static fromJson(usuarioJSON): Usuario {
    return Object.assign(new Usuario(), usuarioJSON);
  }

  constructor(public uid?:string,public nombre?:string,public tipo?:Tipo,
    public apellido?:string,public email?:string,public dni?:number,
    public fechaDeNacimiento?:Date,public telefono?:number, public fotoUrl?:string,
    public proveedor?:string) {}
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