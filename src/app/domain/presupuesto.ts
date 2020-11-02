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

  static dateDayJson(day): string{
    console.log(day)
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
      fechaCreacion:this.fechaCreacion.getFullYear()+"/"+ this.fechaCreacion.getMonth()+"/"+Presupuesto.dateDayJson(this.fechaCreacion.getDate())  ,
    };
  }

}

/* export const condicionesFromJSON = (condiciones): Oferta[] => {
  return condiciones.map(condicion => this.fromJson(condicion))

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
} */