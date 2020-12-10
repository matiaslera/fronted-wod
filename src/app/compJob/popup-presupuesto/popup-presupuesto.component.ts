import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Direccion } from 'src/app/domain/direccion';
import { FileItem } from 'src/app/domain/fileItem';
import { Presupuesto } from 'src/app/domain/presupuesto';
import { Trabajo } from 'src/app/domain/trabajo';
import { Calificacion } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { StorageService } from 'src/app/services/storages/storage.service';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';
import { NewPresupuestoComponent } from '../new-presupuesto/new-presupuesto.component';

@Component({
  selector: 'app-popup-presupuesto',
  templateUrl: './popup-presupuesto.component.html',
  styleUrls: ['./popup-presupuesto.component.css'],
})
export class PopupPresupuestoComponent implements OnInit {
  usuarioBDatos: Calificacion;
  consulta:Trabajo = new Trabajo()
  dire = new Direccion()
  files: FileItem[] = [];
  isOverDrop = false;
  presupuesto:Presupuesto = new Presupuesto()
  busquedaForm = this.builder.group({
    idCreador: ['', Validators.required],
    especialidad: ['', Validators.required],
    problema: ['', Validators.required],
    descripcion: ['', Validators.required],
    provincia: ['', Validators.required],
    ciudad: ['', Validators.required],
    codPostal: ['', Validators.required],
    calle: ['', Validators.required],
    numero: ['', Validators.required],
    pisoDep: ['', Validators.required],
    notas:[''],
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
    /* public dialogRef: MatDialogRef<NewPresupuestoComponent>, */
    /* @Inject(MAT_DIALOG_DATA) public data: DialogData, */
    private builder: FormBuilder,
    private presupuetoSer: TrabajoService,
    public authServ: AuthUserService,
    private snackBar: MatSnackBar,
    private readonly storageSvc: StorageService
  ) {
  }
  
  ngOnInit(): void {
    this.updateFrom();
  }

  updateFrom() {
    this.busquedaForm.patchValue({
      idCreador:  parseInt(this.authServ.getId(),10),
      /* problema: this.data.problema,
      especialidad: this.data.especialidad, */
    });
  }

  async enviarConsulta() {
    this.consulta.idCliente=this.busquedaForm.get('idCreador').value
    this.dire.provincia = this.busquedaForm.get('provincia').value;
    this.dire.ciudad = this.busquedaForm.get('ciudad').value;
    this.dire.codPostal = this.busquedaForm.get('codPostal').value;
    this.dire.calle = this.busquedaForm.get('calle').value;
    this.dire.altura = this.busquedaForm.get('numero').value;
    this.dire.pisoDep =  this.busquedaForm.get('pisoDep').value;
    this.presupuesto.nombre=this.busquedaForm.get('problema').value
    this.presupuesto.descripcion=this.busquedaForm.get('descripcion').value
    this.presupuesto.especialidad=this.busquedaForm.get('especialidad').value
    this.presupuesto.notas=this.busquedaForm.get('notas').value
    this.presupuesto.direccion=this.dire
    this.presupuesto.fechaCreacion=new Date()
    this.consulta.presupuesto=this.presupuesto
    console.log(this.consulta)
    try {
      await this.presupuetoSer.crearTrabajo(this.consulta)
      this.mensaje("se realizo su consulta")
    } catch (e) {
      console.log(e)
      this.mensaje(e.error)
    }
    console.log(this.busquedaForm.value);
    console.log('The dialog envio la consulta');
    /* this.dialogRef.close(); */
  }
  
  cancelar() {
    console.log('The dialog esta cerrado');
    /* this.dialogRef.close(); */
  }

  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 3000,
    });
  }

  onUpload(): void {
    this.storageSvc.uploadImage(this.files);
  }
}

export interface DialogData {
  especialidad: string;
  problema: string;
}
