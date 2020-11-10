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
    console.log("este es el json del presupuesto:",problemJSON)
    return Object.assign(
      new Presupuesto(),
      problemJSON,
      {ofertas:problemJSON.ofertas !== null ?this.listJson(problemJSON.ofertas):null },
      {fechaCreacion: problemJSON.fechaCreacion!=="null"? this.fechaFromJSON(
        problemJSON.fechaCreacion): null},
       { direccion:problemJSON.direccion===undefined?null: Direccion.fromJson(problemJSON.direccion) },
       {ofertas: problemJSON.ofertas? problemJSON.ofertas.map((oferta) => Oferta.fromJson(oferta)):null,} 
    );
  }
  
  static listJson(ofertas): Oferta[]{
    return ofertas.map((oferta) => Oferta.fromJson(oferta))
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

  static fechaFromJSON(fecha: string): Date {
    const data = fecha.split('/')
    console.log("este es el date:",data)
    const res = new Date()
    res.setDate(Number(data[2]))
    res.setMonth(Number(data[1]))
    res.setFullYear(Number(data[0]))
    console.log("esta es la fecha", res)
    return res
  }

  static fechaToJSON(fecha: Date) {
    const local=fecha.toLocaleDateString('es-AR')
    const data = local.split('/')
    const dia =this.dateDayJson(data[0])
    const mes=this.dateDayJson(data[1])
    return data[2]+"/"+ mes+"/"+dia
  }

  toJSON(): any {
    return {
      ...this,
      fechaCreacion:Presupuesto.fechaToJSON(this.fechaCreacion)
      //fechaCreacion:this.fechaCreacion.getFullYear()+"/"+ this.fechaCreacion.getMonth()+"/"+this.fechaCreacion.getDate()
      //fechaCreacion:this.fechaCreacion.getFullYear()+"/"+ this.fechaCreacion.getMonth()+"/"+Presupuesto.dateDayJson(this.fechaCreacion.getDate())  ,
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