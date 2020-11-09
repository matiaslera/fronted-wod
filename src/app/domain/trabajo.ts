import { Oferta } from './oferta';
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
    console.log("este es el error", problemJSON)
    return Object.assign(
      new Trabajo(),
      problemJSON,
      
     {presupuesto:Presupuesto.fromJson(problemJSON.presupuesto)},
     {fechaFinalizacion: problemJSON.fechaFinalizacion!=="null"? this.fechaFromJSON(
        problemJSON.fechaFinalizacion): null},
      {estado:this.estadoFromJSON(problemJSON.estado)}, 
    );
  }
  
/*   static fechaFromJSON(day: string, month: string, year: string): Date {
    console.log(day);
    console.log(month);
    console.log(year);
    const res = new Date();
    res.setDate(Number(day));
    res.setMonth(Number(month));
    res.setFullYear(Number(year));
    return res;
  }
 */
  static fechaFromJSON(fecha: string): Date {
    const data = fecha.split('/')
    const res = new Date()
    res.setDate(Number(data[0]))
    res.setMonth(Number(data[1]))
    res.setFullYear(Number(data[2]))
    return res
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
  CANCELADO
}

