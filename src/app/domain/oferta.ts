import { Cliente } from './cliente';
import { Presupuesto } from './presupuesto';
import { Profesional } from './profesional';
import { Trabajo } from './trabajo';
import { Turno } from './turno';

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

  static fechaToJSON(fecha: Date) {
    if(fecha!==undefined){
    const local=fecha.toLocaleDateString('es-AR')
    const data = local.split('/')
    const dia =this.dateDayJson(data[0])
    const mes=this.dateDayJson(data[1])
    return data[2]+"/"+ mes+"/"+dia}
  }
  static dateDayJson(day): string{
    const number = parseInt(day,10)
    console.log(number)
    if(number<10){
      console.log( '0'+day)
      return '0'+day
    }
    return day
  }

  toJSON(): any {
    return {
      ...this,
      //fechaCreacion:this.fechaCreacion.getFullYear()+"/"+ this.fechaCreacion.getMonth()+"/"+this.fechaCreacion.getDate(),
      fechaCreacion:Oferta.fechaToJSON(this.fechaCreacion)
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
    console.log("es la fecha de oferta"+ fecha)
    const data = fecha.split('/')
    const res = new Date()
    res.setDate(Number(data[2]))
    res.setMonth(Number(data[1]))
    res.setFullYear(Number(data[0]))
    return res
  }
}
export interface DialogJob {
  presupuesto: Trabajo;
  oferta: Oferta;
}

export interface PagoInterface {
  trabajo: Trabajo;
  turno:Turno;
  profesional:Profesional
  cliente:Cliente
}