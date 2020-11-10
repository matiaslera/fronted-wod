import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Presupuesto } from 'src/app/domain/presupuesto';
import { Trabajo } from 'src/app/domain/trabajo';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { JobContatarComponent } from '../job-contatar/job-contatar.component';

@Component({
  selector: 'app-job-finalizado',
  templateUrl: './job-finalizado.component.html',
  styleUrls: ['./job-finalizado.component.css']
})
export class JobFinalizadoComponent implements OnInit {

  problemas: Trabajo[] = [];
  job: Trabajo;
  estado:String;
  busquedaForm = this.builder.group({
    problema: ['', Validators.required],
    especialidad: ['', Validators.required],
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
  imagen= "../../assets/terminado.jpg"
  constructor( 
    private builder: FormBuilder,
    private trabajoServices: TrabajoService,
    public authServ: AuthUserService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.getTrabajos()
    console.log(this.problemas)
    this.estado="finalizado"
  }

  async getTrabajos(){
    if(this.esCliente()){
      this.problemas = await this.trabajoServices.trabajosFinalizadosDe(parseInt(this.authServ.getId(),10))
      console.log(this.problemas);
    }
  }

  noTieneTrabajos(){
    return this.problemas.length ===0
  }

  buscar() {
    var palabra = this.busquedaForm.get('problema').value;
    var especial = this.busquedaForm.get('especialidad').dirty;
    console.log(this.busquedaForm.value);
    this.problemas = this.problemas.filter((trabajo) =>
      this.contiene(trabajo, palabra)
    );
    if (especial) {
      this.problemas = this.problemas.filter(
        (trabajo) =>
          trabajo.presupuesto.especialidad ===
          this.busquedaForm.get('especialidad').value
      );
    }
  }

  contiene(trabajo: Trabajo, palabra: string): boolean {
    palabra = palabra.toLowerCase();
    return (
      trabajo.presupuesto.nombre.toLowerCase().includes(palabra) ||
      trabajo.presupuesto.descripcion.toLowerCase().includes(palabra)
    );
  }

  async clear() {
    this.busquedaForm.patchValue({
      problema: '',
      especialidad: '',
    });
    await this.getTrabajos();
  }

  detalle(trabajo:Trabajo) {
    const dialogRef = this.dialog.open(JobContatarComponent, {
      height: '600px',
      width: '700px',
      hasBackdrop: false,
      panelClass: 'custom-dialog-container',
      data: { presupuesto: trabajo,estado:this.estado },
    });
  }

  esCliente(): boolean {
    return this.authServ.getTipo() === 'CLIENTE';
  }
}
