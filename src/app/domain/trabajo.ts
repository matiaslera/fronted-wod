import { Presupuesto } from './presupuesto';

export class Trabajo {
  constructor(
    public id?: number,
    public idProfesional?: number,
    public idCliente?: number,
    public presupuesto?: Presupuesto,
    public montoFinal?: number,
    public estado?: Estado,
    public calificacion?: number,
    public fechaFinalizacion?: Date
  ) {}

  static fromJson(problemJSON): Trabajo {
    return Object.assign(
      new Trabajo(),
      problemJSON,
      {presupuesto:Presupuesto.fromJson(problemJSON.presupuesto)},
      {fechaFinalizacion:problemJSON.fechaFinalizacion !== null ? this.fechaFromJSON(
        problemJSON.fechaFinalizacion.dayOfMonth,
        problemJSON.fechaFinalizacion.monthValue,
        problemJSON.fechaFinalizacion.year): null},
      {estado:this.estadoFromJSON(problemJSON.estado)} // {_ofertas: problemJSON.ofertas.map((oferta) => Oferta.fromJson(oferta)),}
    );
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

  static estadoFromJSON(estado: string) {
    if (estado === 'PUBLICADO') {
      return Estado.PUBLICADO;
    }
    if (estado === 'CONTRATADO') {
      return Estado.CONTRATADO;
    }
    if (estado === 'FINALIZADO') {
      return Estado.FINALIZADO;
    }
  }
  toJSON(): any {
    return {
      ...this,
    };
  }

}

export enum Estado {
  PUBLICADO,
  CONTRATADO,
  FINALIZADO,
}

