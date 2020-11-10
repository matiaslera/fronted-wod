import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oferta } from 'src/app/domain/oferta';
import { Presupuesto } from 'src/app/domain/presupuesto';
import { Profesional } from 'src/app/domain/profesional';
import { Trabajo } from 'src/app/domain/trabajo';
import { REST_SERVER_URL } from '../routes';

@Injectable({
  providedIn: 'root',
})
export class TrabajoService {
  constructor(private httpCLient: HttpClient) {}
  
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
  
  /*Traer los trabajos pendientes */
  async trabajoContatado(id: number): Promise<Trabajo[]> {
    const trabajos = await this.httpCLient
    .get<Trabajo[]>(REST_SERVER_URL + '/job_contratado/' + id)
    .toPromise();
    console.log(trabajos);
    return trabajos.map((job) => Trabajo.fromJson(job));
  }
}
