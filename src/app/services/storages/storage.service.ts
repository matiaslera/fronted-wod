import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileItem } from 'src/app/domain/fileItem';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private MEDIA_STORAGE_PATH = 'archivos';
  urlsImags:string[]
  urlImg: Observable<string>
  refPerfil:string
  profileUrl: Observable<string | null>;

  /* */
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private readonly storage: AngularFireStorage) {}

  uploadImage(images: FileItem[]) {
    this.urlsImags=[]
    for (const item of images) {
      item.uploading = true;
  
      const filePath = this.generateFileName(item.name);
      this.urlsImags.push(filePath)
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, item.file);
      
      item.uploadPercent = task.percentageChanges();
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            item.downloadURL = fileRef.getDownloadURL();
            item.uploading = false;
          })
        )
        .subscribe();
    }
  }

  uploadAImage(images: FileItem) {
    this.urlImg=null
    images.uploading = true;
  
      const filePath = this.generateFileName(images.name);
      
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, images.file);
      
      images.uploadPercent = task.percentageChanges();
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            images.downloadURL = fileRef.getDownloadURL();
            this.urlImg= fileRef.getDownloadURL();
            images.uploading = false;
          })
        )
        .subscribe();

       /*  const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file); */

   /*  const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const ref = this.storage.ref(filePath);
    const task = ref.putString(file); */

   /*  const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const task = this.storage.upload(filePath, file); */

  }

  uploadFile(event){
    this.refPerfil=null
    let date= new Date().getTime()
    const file = event.target.files[0];
    const filePath = this.MEDIA_STORAGE_PATH+"/" +date +"_"+"fotoPerfil";
    this.refPerfil=filePath
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    
     // observe percentage changes
     this.uploadPercent = task.percentageChanges();
     // get notified when the download URL is available
     task.snapshotChanges().pipe(
         finalize(() => this.downloadURL = fileRef.getDownloadURL() )
      )
     .subscribe()
     /*  file.uploadPercent = task.percentageChanges();
        task.snapshotChanges()
          .pipe(
            finalize(() => {
              file.downloadURL = fileRef.getDownloadURL();
              this.urlImg= fileRef.getDownloadURL();
              file.uploading = false;
            })
          )
          .subscribe(); */
   }

  getFoto(ref:string){
    const fileRef = this.storage.ref(ref);
    this.profileUrl = fileRef.getDownloadURL();
    let algo:string
    this.profileUrl.subscribe(a=>algo=a)
    console.log("este es el link "+algo)
    console.log("este es el link "+this.profileUrl.subscribe(a=>algo=a))
  }



  private generateFileName(name: string): string {
    let date= new Date().getTime()
    return this.MEDIA_STORAGE_PATH+"/" +date +"_"+name
    //return `${this.MEDIA_STORAGE_PATH}/${new Date().getTime()}_${name}`;
  }
}
