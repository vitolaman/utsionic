import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { createUploadTask } from '@angular/fire/storage';
import { CameraPhoto, CameraResultType, CameraSource, Capacitor, FilesystemDirectory, Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DatanotesService {
  public dataFoto : Photo;
  private keyFoto : string = "foto";
  private platform : Platform

  public isiData : Observable<datanote[]>;
  public isiDataColl : AngularFirestoreCollection<datanote>

  public judulp : string;
  public tanggalp : string;
  public nilaip : string;
  public linkp : string;
  public isip : string;

  constructor(
    platform: Platform,
    afs : AngularFirestore
    ) {
    this.platform = platform;
    this.isiDataColl = afs.collection('dataNotes');
    this.isiData = this.isiDataColl.valueChanges();
   }
   public async tambahFoto() {
    const Foto = await Camera.getPhoto ({
      resultType : CameraResultType.Uri,
      source : CameraSource.Camera,
      quality:100
    });
    console.log(Foto);

    const fileFoto = await this.simpanFoto(Foto);

    this.dataFoto = fileFoto;

    Storage.set({
      key: this.keyFoto,
      value: JSON.stringify(this.dataFoto)
    });
  }

  public async simpanFoto(foto : CameraPhoto) {
    const base64Data = await this.readAsBase64(foto);

    const namaFile = new Date().getTime()+'.jpeg';
    const simpanFile = await Filesystem.writeFile({
      path : namaFile,
      data : base64Data,
      directory : FilesystemDirectory.Data
    });

const response = await fetch(foto.webPath);
const blob = await response.blob();
const dataFoto = new File([blob], foto.path, {
  type: "image/jpeg"
})

    if(this.platform.is ('hybrid')) {
      return {
        filePath : simpanFile.uri,
        webviewPath : Capacitor.convertFileSrc(simpanFile.uri),
        dataImage : dataFoto
      }
    } else {
      return {
        filePath : namaFile,
        webviewPath : foto.webPath,
        dataImage : dataFoto
      }
    }

  }

  private async readAsBase64(foto : CameraPhoto){
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: foto.path
      });
      return file.data;
    } else {
      const response = await fetch(foto.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob : Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async loadFoto() {
    const listFoto = await Storage.get({key: this.keyFoto});
    this.dataFoto = JSON.parse(listFoto.value);


    if(!this.platform.is ('hybrid')) {

        const readFile = await Filesystem.readFile({
          path : this.dataFoto.filePath,
          directory : FilesystemDirectory.Data
        });
        this.dataFoto.webviewPath = `data:image/jpeg;base64,${readFile.data}`;

        const response = await fetch(this.dataFoto.webviewPath);
        const blob = await response.blob();

        this.dataFoto.dataImage = new File([blob], this.dataFoto.filePath, {
          type: "image/jpeg"
        });
      
    }
  }

}

export interface Photo{
  filePath : string;
  webviewPath : string;
  dataImage : File;
}

export interface datanote {
  judul : string,
  isi : string,
  tanggal : string,
  nilai : number
  link : string
}