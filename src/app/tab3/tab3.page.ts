import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatanotesService } from '../datanotes.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(    private afStorage : AngularFireStorage,
    private afs : AngularFirestore,
    public dataNote : DatanotesService,) 
    {   
      dataNote.isiDataColl = afs.collection('dataNote');
    dataNote.isiData = dataNote.isiDataColl.valueChanges();
  }
  Hapus() {
    this.afs.collection('cities').doc('DC').delete();
  }
}
