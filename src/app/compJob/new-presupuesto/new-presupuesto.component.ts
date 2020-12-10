import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Trabajo } from 'src/app/domain/trabajo';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { PopupPresupuestoComponent } from '../popup-presupuesto/popup-presupuesto.component';

@Component({
  selector: 'app-new-presupuesto',
  templateUrl: './new-presupuesto.component.html',
  styleUrls: ['./new-presupuesto.component.css'],
})
export class NewPresupuestoComponent implements OnInit {
  problemas: Trabajo[] = [];
  job: Trabajo;
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

  constructor(
    private builder: FormBuilder,
    private presService: TrabajoService,
    public authServ: AuthUserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPresupuestos();
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

  async getPresupuestos() {
    this.job = await this.presService.unTrabajo();
    console.log(this.job);
    this.problemas = await this.presService.trabajosFinalizados();
    console.log(this.problemas);
  }

  async clear() {
    this.busquedaForm.patchValue({
      problema: '',
      especialidad: '',
    });
    await this.getPresupuestos();
  }
  create() {
    const dialogRef = this.dialog.open(PopupPresupuestoComponent, {
      height: '600px',
      width: '700px',
      hasBackdrop: false,
      panelClass: 'custom-dialog-container',
      data: {
        especialidad: this.busquedaForm.get('especialidad').value,
        problema: this.busquedaForm.get('problema').value,
      },
    });
  }

  esCliente(): boolean {
    return this.authServ.getTipo() === 'CLIENTE';
  }
}
