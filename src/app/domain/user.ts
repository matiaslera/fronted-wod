import { Cliente } from './cliente';
import { Profesional } from './profesional';

export class Usuario {
  constructor(
    public uid?: string,
    public nombre?: string,
    public tipo?: Tipo,
    public apellido?: string,
    public email?: string,
    public dni?: number,
    public telefono?: number,
    public fotoUrl?: string,
    public fechaDeNacimiento?: Date,
    public nacionalidad?: string,
    public proveedor?: string
  ) {}

  static fromJson(usuarioJSON): Usuario {
    return Object.assign(
      new Usuario(),
      usuarioJSON,
      {
        tipo: usuarioJSON.tipo === 'CLIENTE' ? Tipo.CLIENTE : Tipo.PROFESIONAL,
      },
      {
        fechaDeNacimiento:
          usuarioJSON.fechaDeNacimiento !== null
            ? this.fechaFromJSON(
                usuarioJSON.fechaDeNacimiento.dayOfMonth,
                usuarioJSON.fechaDeNacimiento.monthValue,
                usuarioJSON.fechaDeNacimiento.year
              )
            : null,
      }
    );
    //{tipo:usuarioJSON.tipo=="CLIENTE"?Tipo.CLIENTE:Tipo.PROFESIONAL}
    //,{tipo:usuarioJSON.tipo=="CLIENTE"?Tipo.CLIENTE:Tipo.PROFESIONAL}
  }

  static fechaFromJSON(day: string, month: string, year: string): Date {
    console.log(day);
    console.log(month);
    console.log(year);
    const res = new Date();
    res.setDate(Number(day));
    res.setMonth(Number(month));
    res.setFullYear(Number(year));
    return res;
  }

  toJSON(): any {
    return {
      ...this,
    };
  }
}

export enum Tipo {
  CLIENTE,
  PROFESIONAL,
}

export class UserFB {
  userEmail: string;
  constructor(
    public providerId?: string,
    public uid?: string,
    public email?: string,
    public tipo?: Tipo
  ) {}
  static fromJson(usuarioJSON): UserFB {
    return Object.assign(new UserFB(), usuarioJSON, usuarioJSON.userEmail==="ninguno"?null: {
      usuario: Usuario.fromJson(usuarioJSON.usuario),
    });
  }
  toJSON(): any {
    return { ...this };
  }
}

export type Calificacion = Cliente | Profesional;
