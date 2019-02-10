import { Component, OnInit } from '@angular/core';
import { EveSystem, Adm, EveHome } from './models/model';
import {AngularFireStorage} from '@angular/fire/storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'WebAdmClient';
  public eveSystems: EveSystem[];
  public eveHome: EveHome;
  public adm: Adm;
  private db: any;

  constructor(private adb: AngularFireStorage ) {
    this.db = this.adb.storage.app.firestore();
  }
  ngOnInit() {

    this.loaddata();
    this.eveHome.eveSystems = this.eveSystems;
    this.adm = {name: "", id: 0, ts: new Date()};

    this.db.collection("systems").doc("EveSystems")
      .onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
      }, function(doc) {
        this.eveSystems = doc.data();
      });
  }

  public save() {
    this.db.collection("systems").doc("EveSystems").set(this.eveSystems);
  }
  public loaddata() {
    const docRef = this.db.collection("systems").doc("EveSystems");
    docRef.get().then(function(doc) {
      if(doc.exists) {
        this.eveSystems = doc.data();
      } else {
        this.populateEsys();
      }
    });
  }
  public remove (a: string, iid: number)  {
    const data = this.eveSystems.filter(a => a.id === iid);
    for (let i = 0; i < data[0].adms.length; i++){
      if (data[0].adms[i].name === a) {
        data[0].adms.splice(i, 1);
      }
    }
    this.save();
  }
  public addTag(e: string, iid: number) {
    const data = this.eveSystems.filter(a => a.id === iid);
    data[0].adms.push({name: e.toUpperCase(), id: 1, ts: new Date()});
    this.save();
  }

  private populateEsys(): any {
    this.eveSystems = [];
    const ee = this.eveSystems;
    console.log("starting");
    ee.push({name: "5XR-KZ", id: 1, adms: []});
    ee.push({name: "75C-WN", id: 2, adms: []});
    ee.push({name: "BG-W90", id: 3, adms: []});
    ee.push({name: "C-0ND2", id: 4, adms: []});
    ee.push({name: "I5Q2-S", id: 5, adms: []});
    ee.push({name: "JI-LGM", id: 6, adms: []});
    ee.push({name: "OCU4-R", id: 7, adms: []});
    ee.push({name: "PO-3QW", id: 8, adms: []});
    ee.push({name: "VF-FN6", id: 9, adms: []});
    ee.push({name: "Y-YGMW", id: 10, adms: []});
    ee.push({name: "Z-PNIA", id: 12, adms: []});
    this.eveHome = { key: "evePower", eveSystems: [] };
    this.eveHome.eveSystems = this.eveSystems;
  }

  public clearSystems(){
      this.populateEsys();
      this.eveHome.key = "evePower";
      this.save();
  }

}
