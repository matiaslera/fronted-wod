import { Usuario } from './user';

export class Profesional {
  constructor(
    public id?: number,
    public usuario?: Usuario,
    public profesion?: string,
    public titulosObtenidos?: string,
    public experienciaLaboral?: string,
    public zonaDeTrabajo?: string,
    public guardia?: boolean
  ) {}

  static fromJson(usuarioJSON): Profesional {
    return Object.assign(new Profesional(), usuarioJSON,{usuario:Usuario.fromJson(usuarioJSON.usuario)});
  }

  toJSON(): any {
    return {
      ...this,
      //agregar datos que no quiero enviar
    };
  }
}
