export class Usuario {
  alias: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: number;
  telefono: number;
  direccion: string;

  static fromJson(usuarioJSON): Usuario {
    return Object.assign(new Usuario(), usuarioJSON);
  }

  constructor() {}
}

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}
