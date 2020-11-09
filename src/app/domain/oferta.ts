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
    return Object.assign(new Oferta(), ofertaJSON,  {fechaCreacion: ofertaJSON.fechaCreacion!=="null"? this.fechaFromJSON(
      ofertaJSON.fechaCreacion): null}, );
  }

  toJSON(): any {
    return {
      ...this,
      fechaCreacion:this.fechaCreacion.getFullYear()+"/"+ this.fechaCreacion.getMonth()+"/"+Presupuesto.dateDayJson(this.fechaCreacion.getDate())  ,
      //asignatario: null,
      //asignadoA: this.asignatario ? this.asignatario.nombre : ''
    };
  }

  /* static fechaFromJSON(day: string, month: string, year: string): Date {
    console.log(day);
    console.log(month);
    console.log(year);
    const res = new Date();
    res.setDate(Number(day));
    res.setMonth(Number(month));
    res.setFullYear(Number(year));
    return res;
  } */

  static fechaFromJSON(fecha: string): Date {
    const data = fecha.split('/')
    const res = new Date()
    res.setDate(Number(data[0]))
    res.setMonth(Number(data[1]))
    res.setFullYear(Number(data[2]))
    return res
  }
}
export interface DialogJob {
  presupuesto: Trabajo;
  oferta: Oferta;
}
