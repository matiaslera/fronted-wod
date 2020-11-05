import { Injectable } from '@angular/core';
import { Usuario, UserFB } from 'src/app/domain/user';
import { HttpClient } from '@angular/common/http';
import { REST_SERVER_URL } from '../routes';
import { of } from 'rxjs/internal/observable/of';
import { User } from 'firebase';
import { Cliente } from 'src/app/domain/cliente';
import { Profesional } from 'src/app/domain/profesional';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

//export Type const TIPO =Cliente|Profesional
export type Condicion=Cliente|Profesional


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profesionales: Profesional[];
  clientes: Cliente[];
  usuarioBD:Condicion;
  usurioFB:UserFB
  cliente: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  profesional: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor( private httpCLient: HttpClient) {
  }

  ngOnInit(): void {}

  get esCliente() {
    return this.cliente.asObservable()
  }

  get esProfesional():Observable<boolean>{
    return this.profesional.asObservable()
  }

  /*Leer un cliente*/
  async getIdCliente(id: Number) {
    const cliente = await this.httpCLient
      .get<Cliente>(REST_SERVER_URL + '/getId_cli/' + id)
      .toPromise();
    return Cliente.fromJson(cliente);
  }
  async getIdUltimoCli() {
    const id_ultimo= await this.httpCLient
      .get<number>(REST_SERVER_URL + '/get_id_ultimo')
      .toPromise();
    return  id_ultimo
  }
  async getEmail(user:UserFB) {
    const usuario= await this.httpCLient
      .post<UserFB>(REST_SERVER_URL + '/get_email',user.toJSON())
      .toPromise();
      console.log(usuario)
    return UserFB.fromJson(usuario)
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
    console.log(cliente.toJSON())
    await this.httpCLient
      .put(REST_SERVER_URL + '/update_cliente/' + cliente.id, cliente.toJSON())
      .toPromise();
  }
  /*Creacion de un cliente*/
  async crearCliente(cliente: Cliente) {
    await this.httpCLient
      .post(REST_SERVER_URL + '/create_cliente', cliente.toJSON())
      .toPromise();
  }
  /*Eliminar un cliente*/
  async eliminarCliente(cliente: Cliente) {
    await this.httpCLient
      .delete(REST_SERVER_URL + '/delete_cliente/' + cliente.id)
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
async actualizarProfesional(profesional: Profesional): Promise<void>{
  console.log("ES PROFESIONAL toJSON "+profesional.toJSON)
 // console.log("ES PROFESIONAL toJSON() "+profesional.toJSON())
  await this.httpCLient.put<Profesional>(REST_SERVER_URL + '/update_profesional', profesional.toJSON()).toPromise();
}
/*Creacion de un Profesional*/
async crearProfesional(profesional: Profesional) {
  await this.httpCLient
    .post(REST_SERVER_URL + '/create_profesional', profesional.toJSON())
    .toPromise();
}
/*Eliminar un Profesional*/
async eliminarProfesional(profesional: Profesional): Promise<void> {
  await this.httpCLient
    .delete<Profesional>(REST_SERVER_URL + '/delete_profesional/' + profesional.id, profesional.toJSON())
    .toPromise();
}

}