export class Direccion {
  constructor(
    public provincia?: string,
    public ciudad?: string,
    public codPostal?: number,
    public calle?: string,
    public altura?: number,
    public pisoDep?: number
  ) {}

  static fromJson(direccionJSON): Direccion {
    return Object.assign(new Direccion(), direccionJSON);
  }

  toJSON(): any {
    return {
      ...this,
      //asignatario: null,
      //asignadoA: this.asignatario ? this.asignatario.nombre : ''
    };
  }
}
