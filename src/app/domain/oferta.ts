import { Presupuesto } from './presupuesto';
import { Trabajo } from './trabajo';

export class  Oferta {
  constructor(
    public id?: number,
    public comentario?: string,
    public fechaCreacion?: Date,
    public montoAprox?: number,
    public idProfesional?: number,
    public especialidad?: string,
    public nombreProf?:string,
    public apellidoProf?:string,
  ) {}

  static fromJson(ofertaJSON): Oferta {
    return Object.assign(new Oferta(), ofertaJSON,{fechaCreacion:ofertaJSON.fechaCreacion !== null ? this.fechaFromJSON(
      ofertaJSON.fechaCreacion.dayOfMonth,
      ofertaJSON.fechaCreacion.monthValue,
      ofertaJSON.fechaCreacion.year): null,} );
  }

  toJSON(): any {
    return {
      ...this,
      //asignatario: null,
      //asignadoA: this.asignatario ? this.asignatario.nombre : ''
    };
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
}
export interface DialogJob {
  presupuesto: Trabajo;
  oferta: Oferta;
}
