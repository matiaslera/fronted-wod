import { Presupuesto } from './presupuesto';

export class  Oferta {
  constructor(
    public id?: number,
    public comentario?: string,
    public fechaCreada?: Date,
    public monto?: number,
    public idProfesional?: number,
    public nombreApellido?: string,
    public especialidad?: string
  ) {}

  static fromJson(ofertaJSON): Oferta {
    return Object.assign(new Oferta(), ofertaJSON,{fechaCreada:ofertaJSON.fechaCreada !== null ? this.fechaFromJSON(
      ofertaJSON.fechaCreada.dayOfMonth,
      ofertaJSON.fechaCreada.monthValue,
      ofertaJSON.fechaCreada.year): null,} );
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
  presupuesto: Presupuesto;
  oferta: Oferta;
}
