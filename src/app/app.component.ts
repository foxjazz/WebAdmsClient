import { Component, OnInit } from '@angular/core';
import { EveSystem, Adm, EveHome } from './models/model';
import {RepoService} from './repo.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private repo: RepoService) {
    this.eveHome = { key: "", eveSystems: [] };
    this.eveHome.eveSystems = this.eveSystems;
  }

  title = 'WebAdmClient';
  public eveSystems: EveSystem[];
  public eveHome: EveHome;
  public adm: Adm;
  ngOnInit() {

    this.loaddata();
    this.eveHome.eveSystems = this.eveSystems;
    this.adm = {name: "", id: 0, ts: new Date()};
  }
  public save() {
    this.repo.save(this.eveHome).subscribe((ldata: any) => {
      console.log(ldata);
    }),
      (error =>
      {console.log(error);

    });
  }
  public loaddata() {
    this.repo.get().subscribe(eve => {
      this.eveHome = eve;
      if (this.eveHome.key == null) {
        this.populateEsys();
      }
      this.eveSystems = this.eveHome.eveSystems;
    }), ( error => {
      console.log(error);
      this.populateEsys();
    });
  }
  public remove (a: string, iid: number){
    this.loaddata();
    const data = this.eveSystems.filter(a => a.id === iid);
    for(let i = 0; i < data[0].adms.length; i++){
      if(data[0].adms[i].name === a) {
        data[0].adms.splice(i, 1);
      }
    }
    this.save();
  }


  public addTag(e: string, iid: number) {
    this.loaddata();
    const data = this.eveSystems.filter(a => a.id === iid);
    data[0].adms.push({name: e, id: 1, ts: new Date()});
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
    ee.push({name: "Z-PNIA", id: 10, adms: []});
    this.eveHome = { key: "evePower", eveSystems: [] };
    this.eveHome.eveSystems = this.eveSystems;
  }

  public clearSystems(){
      this.populateEsys();
      this.eveHome.key = "";
      this.save();
  }

}
