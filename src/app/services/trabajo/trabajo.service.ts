import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    const trabajos = await this.httpCLient.get<Trabajo[]>(REST_SERVER_URL + '/job_final').toPromise();
    return trabajos.map(job => Trabajo.fromJson(job)); 
    //return await this.httpCLient.get<Trabajo[]>(REST_SERVER_URL + '/job_final').toPromise();
  }

  /*Crear una consulta, trabajo */
  async crearTrabajo(trabajo:Trabajo){
    console.log("este es el trabajo", trabajo)
    await this.httpCLient
      .post(REST_SERVER_URL + '/create_job', trabajo.toJSON())
      .toPromise();
  }
  async unTrabajo(): Promise<Trabajo> {
    const job = await this.httpCLient
      .get<Trabajo>(REST_SERVER_URL + '/job')
      .toPromise();
    return Trabajo.fromJson(job)
  }
}
