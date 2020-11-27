import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Profesional } from 'src/app/domain/profesional';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';

@Component({
  selector: 'app-turn-search',
  templateUrl: './turn-search.component.html',
  styleUrls: ['./turn-search.component.css']
})
export class TurnSearchComponent implements OnInit {

  profesionales:Profesional[]=[]
  tecnicos:Profesional[]=[]
  busquedaForm = this.builder.group({
    problema: ['', Validators.required],
    especialidad: ['', Validators.required],
    motivo:[''],
  });
  especialidad: string[] = [
    'Electricidad',
    'Plomeria',
    'Herreria',
    'Gasista',
    'Carpinteria',
    'Pintor',
    'Armado en Seco',
  ];
  motivos: string[] = [
    'Mantenimiento',
    'Consulta Tecnica',
    'Presupuesto',
  ];
  nuevoTurno:boolean=false;
  proximoTurno:boolean;
  previosTurno:boolean;

  constructor(
    private builder: FormBuilder,
    public authServ: AuthUserService,
    public dialog: MatDialog,
    private profileServ: ProfileService,
    private trabajoServ:TrabajoService
  ) {}

  ngOnInit(): void {
    this.getTecnicos()
  }

  buscar() {
    console.log(this.tecnicos)
    var palabra = this.busquedaForm.get('problema').value;
    var especial = this.busquedaForm.get('especialidad').dirty;
    console.log(this.busquedaForm.value);
    this.profesionales=this.tecnicos.filter((profesional) =>
    this.contiene(profesional, palabra));
   // this.profesionales=this.tecnicos
  if (especial) {
    this.tecnicos = this.profesionales.filter(
      (profesional) =>
        profesional.profesion===this.busquedaForm.get('especialidad').value
    );
   // this.profesionales=this.tecnicos
  }
  }

  contiene(profesional: Profesional, palabra: string): boolean {
    palabra = palabra.toLowerCase();
    return (
      profesional.usuario.nombre.toLowerCase().includes(palabra) ||
      profesional.usuario.email.toLowerCase().includes(palabra)
    );
  }

  async getTecnicos() {
    this.tecnicos = await this.profileServ.getProfesionals();
    console.log(this.profesionales);
  }

  async clear() {
    this.busquedaForm.patchValue({
      problema: '',
      especialidad: '',
      motivo:''
    });
    await this.getTecnicos();
  }

  esCliente(): boolean {
    return this.authServ.getTipo() === 'CLIENTE';
  }

  nuevo(){
    this.nuevoTurno=true
    
  }

  proximo(){

  }

  previo(){

  }


  
  cancelar(){
    this.nuevoTurno=false
  }


  datosGuardar(){
    console.log(this.busquedaForm.get('motivo').value)
    this.trabajoServ.motivoTurno=this.busquedaForm.get('motivo').value
  }
}
