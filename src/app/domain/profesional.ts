import { Usuario } from './user';

export class Profesional {
  constructor(
    public id?: number,
    public usuario?: Usuario,
    public profesion?: string,
    public titulosObtenidos?: string,
    public experienciaLaboral?: string,
    public zonaDeTrabajo?: string,
    public guardia?: boolean,
    public trabajos?:string[],
  ) {}

  static fromJson(usuarioJSON): Profesional {
    return Object.assign(new Profesional(), usuarioJSON,{usuario:Usuario.fromJson(usuarioJSON.usuario)});
  }

  toJSON(): any {
    /* return Object.assign(
      {...this},
      {usuario:this.usuario.toJSON()},
      {trabajos:null}
      ) */
      console.log("{...this}")
      console.log({...this})
    return  {
      ...this,
      //usuario: this.usuario.toJSON(),
    }
      
      //{usuario: this.usuario.toJSON()}
    
      //agregar datos que no quiero enviar
  }
}
