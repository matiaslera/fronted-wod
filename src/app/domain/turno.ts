import { Direccion } from './direccion';
import { Presupuesto } from './presupuesto';

export class Turno {
  constructor(
    public id?: number,
    public idProfesional?: number,
    public idCliente?: number,
    public montoFinal?: number,
    public estado?: Estado,
    public calificacion?: number,
    public direccion?:Direccion,
    public fechaTrabajo?: Date,
    //public turnoDelDia?:string,
    public motivos?:string,
    public hora?:number,
    public minutos?:number,
  ) {}

  static fromJson(problemJSON): Turno {
    console.log("este es el json de trabajo:", problemJSON)
    return Object.assign(
      new Turno(),
      problemJSON,
    {fechaTrabajo: problemJSON.fechaTrabajo!=="null"? this.fechaFromJSON(
            problemJSON.fechaTrabajo): null},
      {estado:this.estadoFromJSON(problemJSON.estado)}, 
    );
  }

  static fechaFromJSON(fecha: string): Date {
    const data = fecha.split('/')
    const res = new Date()
    res.setDate(Number(data[2]))
    res.setMonth(Number(data[1])-1)
    res.setFullYear(Number(data[0]))
    return res
  }

  static fechaToJSON(fecha: Date) {
    const fecha2= fecha.toString()
    console.log(fecha2)
    const fecha3= fecha2.split('-')
      console.log(fecha3)
    return fecha3[0]+"/"+fecha3[1]+"/"+fecha3[2]
      
      /*  fecha.toLocaleDateString('es-AR')
       const mes= (fecha.getMonth()+1)
      return fecha.getFullYear()+"/"+ mes+"/"+Turno.dateDayJson(fecha.getDate()) */
    //const local=fecha.toLocaleDateString('es-AR')
    /* const data = local.split('/')
    const dia =this.dateDayJson(data[0])
    const mes=this.dateDayJson(data[1])
    return data[2]+"/"+ mes+"/"+dia */
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
    if (estado === 'CANCELADO') {
        return Estado.CANCELADO;
      }
  }
  toJSON(): any {
    //console.log(this.fechaTrabajo.getFullYear()+"/"+ this.fechaTrabajo.getMonth()+"/"+this.fechaTrabajo.getDate())
    console.log(this.fechaTrabajo) 
    return {
      ...this,
      fechaTrabajo:this.fechaTrabajo!==undefined && this.fechaTrabajo!==null?Turno.fechaToJSON(this.fechaTrabajo):null
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

export interface DialogTurno {
  turno: Turno;

}