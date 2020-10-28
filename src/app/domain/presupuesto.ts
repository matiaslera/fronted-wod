import { Direccion } from './direccion';
import { Oferta } from './oferta';

export class Presupuesto {
  constructor(
    public _id?: number,
    public _nombre?: string,
    public _especialidad?: string,
    public _fecha?: Date,
    public _direccion?: Direccion,
    public _descripcion?: string,
    public _notas?: string,
    public _monto?: number,
    public _realizado?: boolean,
    public _ofertas?: Oferta[]
  ) {}

  static fromJson(problemJSON): Presupuesto {
    return Object.assign(new Presupuesto(), problemJSON, {
      _ofertas: problemJSON.ofertas.map((oferta) =>
        Oferta.fromJson(oferta)
      ),
    });
  }

  toJSON(): any {
    return {
      ...this,
    };
  }
}
