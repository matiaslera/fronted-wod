import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { FileItem } from 'src/app/domain/fileItem';
import { Calificacion, UserFB } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { StorageService } from 'src/app/services/storages/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user$: Observable<any> = this.authServ.angularAuth.user; //esta conectado o no
  usuarioBDatos: Calificacion; // =this.perfilSer.usuarioBD
  usuarioFire: User;
  actualizar: number = 0;
  errors = [];
  fotoServicio:Observable<string|null>
  fotoDefault:string="../../assets/perfil01.jpg"

  /* */
  showImg:boolean=false
  uploadPercent: Observable<number>=this.storageSvc.uploadPercent
  downloadURL: Observable<string>=this.storageSvc.downloadURL
  constructor(
    public authServ: AuthUserService,
    public perfilSer: ProfileService,
    private readonly storageSvc: StorageService,
    private storage: AngularFireStorage
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.authServ.getTipo() === 'CLIENTE') {
      this.usuarioBDatos = await this.perfilSer.getIdCliente(parseInt(this.authServ.getId(),10)) ;
      const ref = this.storage.ref(this.usuarioBDatos.fotoUrl);
      this.fotoServicio = ref.getDownloadURL();
     /*  this.foto(); */
      console.log('estoy en LOCAL STORAGE- CLIENTE:', this.usuarioBDatos);
    }
    if (this.authServ.getTipo() === 'PROFESIONAL') {
     this.usuarioBDatos = await this.perfilSer.getIdProfesional(parseInt(this.authServ.getId(),10))
     const ref = this.storage.ref(this.usuarioBDatos.fotoUrl);
     this.fotoServicio = ref.getDownloadURL();
    /*  this.foto(); */
      console.log('estoy en LOCAL STORAGE- PROFESIONAL:', this.usuarioBDatos);
    }
    console.log(this.usuarioBDatos);
  }

  modify() {
    this.actualizar = 2;
  }

  verDato() {
    this.actualizar = 1;
  }

  cancel(condicion) {
    this.actualizar = condicion;
  }

 /*  foto() {
    this.storageSvc.getFoto( this.usuarioBDatos.fotoUrl)
  } */

  async updateDatos(event) {
    console.log(event);
    if (event === 'listo') {
      console.log("entre a updatear")
      if (this.authServ.getTipo() === 'CLIENTE') {
        this.usuarioBDatos = await this.perfilSer.getIdCliente(parseInt(this.authServ.getId(),10)) ;
        console.log(this.usuarioBDatos)
      }
      if (this.authServ.getTipo() === 'PROFESIONAL') {
       this.usuarioBDatos = await this.perfilSer.getIdProfesional(parseInt(this.authServ.getId(),10))
       console.log(this.usuarioBDatos)
      }
    } else {
      console.log(event);
    }
  }


  onUpload(event): void {
    this.storageSvc.uploadFile(event);
    this.updateUser()
  }

  async updateUser(){
    if (this.authServ.getTipo() === 'CLIENTE') {
      this.usuarioBDatos = await this.perfilSer.getIdCliente(parseInt(this.authServ.getId(),10)) ;
      console.log("este es el url para actualizar: "+this.storageSvc.refPerfil)
      this.usuarioBDatos.fotoUrl=this.storageSvc.refPerfil
      const ref = this.storage.ref(this.usuarioBDatos.fotoUrl);
     this.fotoServicio = ref.getDownloadURL();
      this.perfilSer.actualizarCliente(this.usuarioBDatos)
     
    }
    if (this.authServ.getTipo() === 'PROFESIONAL') {
     this.usuarioBDatos = await this.perfilSer.getIdProfesional(parseInt(this.authServ.getId(),10))
     console.log("este es el url para actualizar: "+this.storageSvc.refPerfil)
     this.usuarioBDatos.fotoUrl=this.storageSvc.refPerfil
     const ref = this.storage.ref(this.usuarioBDatos.fotoUrl);
     this.fotoServicio = ref.getDownloadURL();
     this.perfilSer.actualizarProfesional(this.usuarioBDatos)
    }
  }

  verImg(){
    console.log("presione un boton")
    if(this.showImg===false){
     this.showImg=true
     return 
    }
    if(this.showImg===true){
      this.showImg=false
      return 
    }
  }

}

export const urlLocal = '../../assets/perfil01.jpg';
