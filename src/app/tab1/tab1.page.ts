import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { datanote, DatanotesService } from '../datanotes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  urlImageStorage : string;
  public itemUploadFoto : Photo[] = [];
  Judul : string;
  Isi : string;
  Tanggal : Date;
  Nilai : number;
  Link : string;
  constructor(
    private afStorage : AngularFireStorage,
    private afs : AngularFirestore,
    public dataNote : DatanotesService
  ) {
    dataNote.isiDataColl = afs.collection('dataNote');
    dataNote.isiData = dataNote.isiDataColl.valueChanges();
  }

  uploadFoto(){
    this.dataNote.tambahFoto();

  }
  TambahNotes(){
    this.urlImageStorage= "";
    this.itemUploadFoto.unshift(this.dataNote.dataFoto);
    for(var index in this.itemUploadFoto) {
      const imgFilepath = `imgStorage/${this.itemUploadFoto[index].filePath}`;

      this.afStorage.upload(imgFilepath, this.itemUploadFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          this.Link = url;
          this.itemUploadFoto = [];
          this.Tanggal = new Date();
          this.dataNote.isiDataColl.doc(this.Judul).set({
            judul : this.Judul,
            isi: this.Isi,
            tanggal: this.Tanggal.toDateString(),
            nilai: this.Nilai,
            link : this.Link
          });
          console.log(url);
        });
      });
    }


  }
}
export interface Photo{
  filePath : string;
  webviewPath : string;
  dataImage : File;
}