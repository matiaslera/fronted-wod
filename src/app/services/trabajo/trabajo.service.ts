import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trabajo } from 'src/app/domain/trabajo';
import { REST_SERVER_URL } from '../routes';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  constructor(private httpCLient: HttpClient) { }

/*Devuelve los trabajos finalizados */
  async trabajosFinalizados():Promise<Trabajo[]> {
    const cliente = await this.httpCLient
      .get<Trabajo[]>(REST_SERVER_URL + '/job_finish' )
      .toPromise();
    return cliente.map((user) => Trabajo.fromJson(user));
  }
}
