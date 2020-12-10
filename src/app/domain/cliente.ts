import { Direccion } from './direccion';
import { Usuario } from './user';

export class Cliente {
  constructor(
    public id?: number,
    public usuario?: Usuario,
    public domicilio?: Direccion,
    public fotoUrl?:string,
  ) {}

  static fromJson(usuarioJSON): Cliente {
    return Object.assign(
      new Cliente(),usuarioJSON,
      {usuario: Usuario.fromJson(usuarioJSON.usuario)},
      { domicilio: Direccion.fromJson(usuarioJSON.direccion), },
    );
    //,{ usuario: User.fromJSON(tareaJSON.asignadoA) }
    /*{
        fotoUrl: usuarioJSON.fotoURL
      }*/
  }

  toJSON(): any {
    console.log(this)
    console.log(this.usuario)
    return {
      ...this,
      usuario: this.usuario.toJSON(),
     // fotoURL:this.fotoUrl
      //asignatario: null,
      //asignadoA: this.asignatario ? this.asignatario.nombre : ''
    };
  }
}
