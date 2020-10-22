import { Oferta } from './oferta';

export class Presupuesto {

    constructor(public _id?:number,public _idCreador?: number,public _problema?: string,public _especialidad?: string,public _descripcion?: string,public _direccion?: string,
        public _notas?: string,public _monto?: number, public _realizado?:boolean,public _fecha?: Date,public _ofertas?:Oferta[]){
    }

    static fromJson(problemJSON): Presupuesto {
        return Object.assign(new Presupuesto(), problemJSON,
        {_ofertas: problemJSON.ofertas.map((alimento) => Oferta.fromJson(alimento))},
        )
    }

    toJSON():any{
        return{
          ...this
        }
      }

}

/*
export class Usuario {
	
  constructor(public uid?:string,public nombre?:string,public tipo?:Tipo,
    public apellido?:string,public email?:string,public dni?:number,
    public telefono?:number, public fotoUrl?:string,public fechaDeNacimiento?:Date,public nacionalidad?:string,
    public proveedor?:string) {}

    static fromJson(usuarioJSON): Usuario {
      return Object.assign(new Usuario(), usuarioJSON,{tipo:usuarioJSON.tipo==="CLIENTE"?Tipo.CLIENTE:Tipo.PROFESIONAL});
      //{tipo:usuarioJSON.tipo=="CLIENTE"?Tipo.CLIENTE:Tipo.PROFESIONAL}
      //,{tipo:usuarioJSON.tipo=="CLIENTE"?Tipo.CLIENTE:Tipo.PROFESIONAL}
    }
  
    toJSON():any{
      return{
        ...this
      }
    }
}
 */