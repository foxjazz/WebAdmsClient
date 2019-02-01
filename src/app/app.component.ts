import { Component, OnInit } from '@angular/core';
import { EveSystem, Adm } from './models/model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WebAdmClient';
  public eveSystems: EveSystem[];

  public adm: Adm;
  ngOnInit() {
    this.populateEsys();
    this.adm = {name: "", id: 0};
  }
  public save() {

  }
  public remove (a: string, iid: number){
    const data = this.eveSystems.filter(a => a.id === iid);
    for(let i = 0; i < data[0].adms.length; i++){
      if(data[0].adms[i].name === a) {
        data[0].adms.splice(i, 1);
      }
    }
  }
  public addTag(e: string, iid: number) {
    const data = this.eveSystems.filter(a => a.id === iid);
    data[0].adms.push({name: e, id: 1});
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
  }
  addAdm(id: number, adm: Adm) {
    const sys = this.eveSystems.filter(a => a.id === id);
    sys[0].adms.push(adm);
  }
}
