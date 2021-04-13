import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { DatanotesService } from '../datanotes.service';
import { Tab3Page } from '../tab3/tab3.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private afStorage : AngularFireStorage,
    private afs : AngularFirestore,
    public dataNote : DatanotesService,
    private router: Router
  ) {
    dataNote.isiDataColl = afs.collection('dataNote');
    dataNote.isiData = dataNote.isiDataColl.valueChanges();
  }
pindah(data) {
  this.dataNote.judulp = data.judul;
  this.dataNote.isip = data.isi;
  this.dataNote.tanggalp = data.tanggal;
  this.dataNote.linkp = data.link;
  this.dataNote.nilaip = data.nilai;
  console.log("pindah!");
  this.router.navigateByUrl("tabs/tab3");
}
}
