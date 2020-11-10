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
    console.log("este es el json de trabajo:", problemJSON)
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
    res.setDate(Number(data[2]))
    res.setMonth(Number(data[1]))
    res.setFullYear(Number(data[0]))
    return res
  }

  static fechaToJSON(fecha: Date) {
    const local=fecha.toLocaleDateString('es-AR')
    const data = local.split('/')
    const dia =this.dateDayJson(data[0])
    const mes=this.dateDayJson(data[1])
    return data[2]+"/"+ mes+"/"+dia
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
    console.log(this.fechaFinalizacion.getFullYear()+"/"+ this.fechaFinalizacion.getMonth()+"/"+this.fechaFinalizacion.getDate())
    return {
      ...this,
      fechaFinalizacion:Trabajo.fechaToJSON(this.fechaFinalizacion)
      //fechaFinalizacion:this.fechaFinalizacion.getFullYear()+"/"+ this.fechaFinalizacion.getMonth()+"/"+this.fechaFinalizacion.getDate()
    };
  }

}

export enum Estado {
  PUBLICADO,
  CONTRATADO,
  FINALIZADO,
  CANCELADO
}

