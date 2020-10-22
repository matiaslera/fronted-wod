import { Presupuesto } from './presupuesto'

export class Oferta {

   constructor(public id?:number, public comentario?:string, public fechaCreada?:Date, public monto?:number, public idProfesional?:number, 
        public nombreApellido?:string, public especialidad?:string){
    }
	 
    static fromJson(ofertaJSON): Oferta {
        return Object.assign(new Oferta(), ofertaJSON)
    }

    toJSON(): any {
        return {
            ...this,
            //asignatario: null,
            //asignadoA: this.asignatario ? this.asignatario.nombre : ''
        }
    }
}
export interface DialogJob {
    presupuesto: Presupuesto;
    oferta: Oferta;
  }