import { Turno } from './turno';

export class Pago {
  constructor(
    public id?: number,
    public idProfesional?: number,
    public nombreEntidad?: string,
    public cbu?: number,
    public alias?: string,
    public nombreCuenta?: string,
    public numeroCuenta?: number,
  ) {}

  static fromJson(pagoJson): Pago {
    return Object.assign(new Pago(), pagoJson);
  }

  toJSON(): any {
    /* console.log('{...this}');
    console.log({ ...this }); */
    return {
      ...this,
      //usuario: this.usuario.toJSON(),
    };
  }
}

export class Cobro {
  constructor(
    public id?: number,
    public idProfesional?: number,
    public idCliente?: number,
    public idTurno?: Turno,
    public pago?: Pago,
    public montoFinal?: number
  ) {}

  static fromJson(pagoJson): Pago {
    return Object.assign(new Pago(), pagoJson);
  }

  toJSON(): any {
    /* console.log('{...this}');
    console.log({ ...this }); */
    return {
      ...this,
      //usuario: this.usuario.toJSON(),
    };
  }
}
