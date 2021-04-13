import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatanotesService } from '../datanotes.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private afStorage : AngularFireStorage,
    private afs : AngularFirestore,
    public dataNote : DatanotesService
  ) {
    dataNote.isiDataColl = afs.collection('dataNote');
    dataNote.isiData = dataNote.isiDataColl.valueChanges();
  }

}
