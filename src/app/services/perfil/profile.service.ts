import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/domain/user';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from '../auth/auth-user.service';
import { REST_SERVER_URL } from '../routes';
import { isUndefined } from 'util';
import { of } from 'rxjs/internal/observable/of';
import { User } from 'firebase';
import { Cliente } from 'src/app/domain/cliente';
import { Profesional } from 'src/app/domain/profesional';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profesionales: Profesional[];
  clientes: Cliente[];
  esCliente: boolean;
  usuario: User;

  constructor( private httpCLient: HttpClient) {
  }

  ngOnInit(): void {}

  /*Leer un cliente*/
  async getIdCliente(id: Number) {
    const cliente = await this.httpCLient
      .get<Cliente>(REST_SERVER_URL + '/getId_cli/' + id)
      .toPromise();
    return Cliente.fromJson(cliente);
  }
  /*Leer todos los clientes*/
  async getClientes(): Promise<Cliente[]> {
    const clientes = await this.httpCLient
      .get<Cliente[]>(REST_SERVER_URL + '/get_cli')
      .toPromise();
    return clientes.map((user) => Cliente.fromJson(user));
  }
  /*Actualizar de un cliente*/
  async actualizarCliente(cliente: Cliente) {
    await this.httpCLient
      .put(REST_SERVER_URL + '/update_cliente/' + cliente.id, cliente.toJSON())
      .toPromise();
  }
  /*Creacion de un cliente*/
  async crearCliente(cliente: Cliente) {
    await this.httpCLient
      .post(REST_SERVER_URL + '/create_cliente/' + cliente.id, cliente.toJSON())
      .toPromise();
  }
  /*Eliminar un cliente*/
  async eliminarCliente(cliente: Cliente) {
    await this.httpCLient
      .delete(REST_SERVER_URL + '/delete_cliente/' + cliente.id, cliente.toJSON())
      .toPromise();
  }
/*Leer un Profesional*/
async getIdProfesional(id: Number) {
  const profesional = await this.httpCLient
    .get<Profesional>(REST_SERVER_URL + '/getId_prof/' + id)
    .toPromise();
  return Profesional.fromJson(profesional);
}
/*Leer todos los Profesionals*/
async getProfesionals(): Promise<Profesional[]> {
  const profesionals = await this.httpCLient
    .get<Profesional[]>(REST_SERVER_URL + '/get_pros')
    .toPromise();
  return profesionals.map((user) => Profesional.fromJson(user));
}
/*Actualizar de un Profesional*/
async actualizarProfesional(profesional: Profesional) {
  await this.httpCLient
    .put(REST_SERVER_URL + '/update_profesional/', profesional.toJson())
    .toPromise();
}
/*Creacion de un Profesional*/
async crearProfesional(profesional: Profesional) {
  await this.httpCLient
    .post(REST_SERVER_URL + '/create_profesional/', profesional.toJson())
    .toPromise();
}
/*Eliminar un Profesional*/
async eliminarProfesional(profesional: Profesional) {
  await this.httpCLient
    .delete(REST_SERVER_URL + '/delete_profesional/' + profesional.id, profesional.toJson())
    .toPromise();
}

}
