import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { NewPresupuestoComponent } from '../new-presupuesto/new-presupuesto.component';

@Component({
  selector: 'app-popup-presupuesto',
  templateUrl: './popup-presupuesto.component.html',
  styleUrls: ['./popup-presupuesto.component.css'],
})
export class PopupPresupuestoComponent implements OnInit {
  busquedaForm = this.builder.group({
    idCreador: ['', Validators.required],
    problema: ['', Validators.required],
    especialidad: ['', Validators.required],
    direccion: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<NewPresupuestoComponent>,
    private builder: FormBuilder,
    private presupuetoSer: TrabajoService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private profileService: ProfileService
  ) {
    this.updateFrom();
  }

  ngOnInit(): void {}

  updateFrom() {
    this.busquedaForm.patchValue({
      // idCreador: this.profileService.getUserLoggedId(),
      problema: this.data.problema,
      especialidad: this.data.especialidad,
    });
  }

  cancelar() {
    console.log('The dialog esta cerrado');
    this.dialogRef.close();
  }

  async enviarConsulta() {
    try {
      //await this.presupuetoSer.addPresupuesto(this.busquedaForm.value)
      //this.problemas=this.presService.basePresupuestos
    } catch (e) {
      e.error;
    }
    console.log(this.busquedaForm.value);
    console.log('The dialog envio la consulta');
    this.dialogRef.close();
  }
}

export interface DialogData {
  especialidad: string;
  problema: string;
}
