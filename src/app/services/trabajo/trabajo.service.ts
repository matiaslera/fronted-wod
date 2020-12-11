import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Oferta } from 'src/app/domain/oferta';
import { Presupuesto } from 'src/app/domain/presupuesto';
import { Profesional } from 'src/app/domain/profesional';
import { Trabajo } from 'src/app/domain/trabajo';
import { Turno } from 'src/app/domain/turno';
import { REST_SERVER_URL } from '../routes';

@Injectable({
  providedIn: 'root',
})
export class TrabajoService {
  
  motivoTurno:string
  constructor(private httpCLient: HttpClient,private snackBar: MatSnackBar,) {}
  
  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 3000,
    });
  }

  /*Devuelve los trabajos finalizados */
  async trabajosFinalizados(): Promise<Trabajo[]> {
    //debugger
    const trabajos = await this.httpCLient
    .get<Trabajo[]>(REST_SERVER_URL + '/job_final')
    .toPromise();
    return trabajos.map((job) => Trabajo.fromJson(job));
    //return await this.httpCLient.get<Trabajo[]>(REST_SERVER_URL + '/job_final').toPromise();
  }
  /*Devuelve los trabajos finalizados,  de un cliente */
  async trabajosFinalizadosDe(id:number): Promise<Trabajo[]> {
    //debugger
    const trabajos = await this.httpCLient
    .get<Trabajo[]>(REST_SERVER_URL + '/job_finalizado/'+id)
    .toPromise();
    return trabajos.map((job) => Trabajo.fromJson(job));
    //return await this.httpCLient.get<Trabajo[]>(REST_SERVER_URL + '/job_final').toPromise();
  }
  
  /*Crear una consulta, trabajo */
  async crearTrabajo(trabajo: Trabajo) {
    console.log('este es el trabajo', trabajo);
    await this.httpCLient
    .post(REST_SERVER_URL + '/create_job', trabajo.toJSON())
    .toPromise();
  }
  async unTrabajo(): Promise<Trabajo> {
    const job = await this.httpCLient
    .get<Trabajo>(REST_SERVER_URL + '/job')
    .toPromise();
    return Trabajo.fromJson(job);
  }
  
  /*Conseguir trabajos publicados */
  async trabajoPublicado(id: number): Promise<Trabajo[]> {
    const trabajos = await this.httpCLient
    .get<Trabajo[]>(REST_SERVER_URL + '/query_made/' + id)
    .toPromise();
    console.log(trabajos);
    return trabajos.map((job) => Trabajo.fromJson(job));
  }
  
  /*Conseguir un trabajo completo, con sus detalles */
  async trabajoFull(id: number) {
    const job = await this.httpCLient
    .get<Trabajo>(REST_SERVER_URL + '/job_completo/' + id)
    .toPromise();
    return Trabajo.fromJson(job);
  }
  
  /*Crear una oferta nueva, tiene el id del trabajo */
  async nuevaOferta(ofertaJob: Oferta, id: number) {
    console.log('este es la oferta', ofertaJob);
    await this.httpCLient
    .post(REST_SERVER_URL + '/create_oferta/' + id, ofertaJob.toJSON())
    .toPromise();
  }
  
  /*Devuelve los trabajos especializado, envia un profesional */
  async trabajoPorEsp(profesional: Profesional) {
    console.log('este es la oferta', profesional);
    const trabajos = await this.httpCLient
    .post<Trabajo[]>(REST_SERVER_URL + '/job_especialidad' , profesional.toJSON())
    .toPromise();
    return trabajos.map((job) => Trabajo.fromJson(job));
  }
  /*Contratar un trabajo, enviar el trabajo editado*/
  async contratar(job: Trabajo) {
    console.log('este es el trabajo modificado, contratado', job, job.toJSON(),JSON.stringify(job));
    await this.httpCLient.put(REST_SERVER_URL + '/job_contratado' , job.toJSON()).toPromise();;
  }
  
  /*Updatear trabajo */
  async update(job: Trabajo) {
    await this.httpCLient.put(REST_SERVER_URL + '/job_update' , job.toJSON()).toPromise();;
  }
  
  /*Traer los trabajos pendientes */
  async trabajoContatado(id: number): Promise<Trabajo[]> {
    const trabajos = await this.httpCLient
    .get<Trabajo[]>(REST_SERVER_URL + '/job_contratado/' + id)
    .toPromise();
    console.log(trabajos);
    return trabajos.map((job) => Trabajo.fromJson(job));
  }

  /*Traer los trabajos pendientes */
  async trabajoQueMeContrataron(id: number): Promise<Trabajo[]> {
    const trabajos = await this.httpCLient
    .get<Trabajo[]>(REST_SERVER_URL + '/job_contratado_prof/' + id)
    .toPromise();
    console.log(trabajos);
    return trabajos.map((job) => Trabajo.fromJson(job));
  }

  /*Crea un nuevo Turno */
  async crearTurno(nuevoTurno: Turno) {
    //console.log('este es el trabajo', trabajo);
    await this.httpCLient.post(REST_SERVER_URL + '/create_turno', nuevoTurno.toJSON()).toPromise();
    this.mensaje("se creo su turno, ingrese a la parte de proximo para verlo")
  }
  /*Leer un Turno por ID*/
  async leerTurno(id:number): Promise<Turno> {
    //console.log('este es el trabajo', trabajo);
    const turno= await this.httpCLient.get(REST_SERVER_URL + '/reed_turno'+id).toPromise();
    return Trabajo.fromJson(turno);
  }
  //Leer todos los turnos cargados
  async listTurnos(): Promise<Turno[]> {
    const turnos = await this.httpCLient
    .get<Trabajo[]>(REST_SERVER_URL + '/reed_turnos').toPromise();
    console.log(turnos);
    return turnos.map((job) => Turno.fromJson(job));
  }
  //actualiza el turno
  async actualizarTurno(turno:Turno) {
    await this.httpCLient.put(REST_SERVER_URL + '/update_turno',turno.toJSON() ).toPromise();;
  }
   //eliminar el turno
   async eliminarTurno(turno:Turno) {
    await this.httpCLient.delete(REST_SERVER_URL + '/delete_turno',turno.toJSON() ).toPromise();;
  }
   //Leer todos los turnos de los clientes
   async turnosClientes(id:number): Promise<Turno[]> {
    const turnos = await this.httpCLient
    .get<Turno[]>(REST_SERVER_URL + '/reed_turnoCliente/'+id).toPromise();
   /*  if (turnos.length===0){
      console.log(turnos);
      const turnEnviado:Turno[] = []
      return turnEnviado
    } */
    console.log(turnos);
    return turnos.map((job) => Turno.fromJson(job));
  }
  //Leer todos los turnos de los clientes
  async turnosProfesional(id:number): Promise<Turno[]> {
    const turnos = await this.httpCLient
    .get<Turno[]>(REST_SERVER_URL + '/reed_turnoProfesional/'+id).toPromise();
    console.log(turnos);
    return turnos.map((job) => Turno.fromJson(job));
  }

}
