import { User } from 'firebase';
import { Usuario } from './user';

export class Cliente {
  constructor(public id?: number, public usuario?: Usuario) {}

  static fromJson(usuarioJSON): Cliente {
    return Object.assign(new Cliente(), usuarioJSON);
    //,{ usuario: User.fromJSON(tareaJSON.asignadoA) }
  }

  toJSON(): any {
    return {
        ...this,
        //asignatario: null,
        //asignadoA: this.asignatario ? this.asignatario.nombre : ''
    }
}

}
