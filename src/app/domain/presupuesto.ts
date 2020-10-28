import { Direccion } from './direccion';
import { Oferta } from './oferta';

export class Presupuesto {
  constructor(
    public nombre?: string,
    public especialidad?: string,
    public descripcion?: string,
    public notas?: string,
    public direccion?: Direccion,
    public fechaCreacion?: Date,
    public ofertas?: Oferta[]
  ) {}

  static fromJson(problemJSON): Presupuesto {
    console.log("este es el json",problemJSON)
    return Object.assign(
      new Presupuesto(),
      problemJSON,
      {
        ofertas:problemJSON.ofertas !== null ?this.listJson(problemJSON.ofertas):null
      },
       { direccion:problemJSON.direccion===undefined?null: Direccion.fromJson(problemJSON.direccion) } 
    );
  }
  
  static listJson(ofertas): Oferta[]{
    return ofertas.map((oferta) => Oferta.fromJson(oferta))
  }

  toJSON(): any {
    return {
      ...this,
    };
  }

}

/* export const condicionesFromJSON = (condiciones): Oferta[] => {
  return condiciones.map(condicion => this.fromJson(condicion))
} */