import { Component, OnInit } from '@angular/core';
import { EveSystem, Adm, EveHome } from './models/model';
import {RepoService} from './repo.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
//import * as signalR from "@aspnet/signalr";
import {LogLevel} from '@aspnet/signalr';
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
  private hubConnection: HubConnection;
  constructor(private repo: RepoService) {
    this.eveHome = { key: "", eveSystems: [] };
    this.eveHome.eveSystems = this.eveSystems;
    // @ts-ignore

  }
  ngOnInit() {

    this.loaddata();
    this.eveHome.eveSystems = this.eveSystems;
    this.adm = {name: "", id: 0, ts: new Date()};
    const uri = this.repo.getSRUri() + "/admchanges";
    // Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
    this.hubConnection = new HubConnectionBuilder().configureLogging(LogLevel.Trace)
      .withUrl(uri).build();


    this.hubConnection.on('addadm', (name: string, system: number) => {
      this.eveSystems = this.eveHome.eveSystems;
      const data = this.eveSystems.filter(a => a.id === system);
      data[0].adms.push({name: name.toUpperCase(), id: 1, ts: new Date()});
    });

    this.hubConnection.on('removeadm', (name: string, system: number) => {
      this.eveSystems = this.eveHome.eveSystems;
      const data = this.eveSystems.filter(a => a.id === system);
      for (let i = 0; i < data[0].adms.length; i++){
        if (data[0].adms[i].name === name) {
          data[0].adms.splice(i, 1);
        }
      }
    });

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :(' + err));
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
  public remove (a: string, iid: number)
  {
    this.hubConnection.invoke("removeadm", a, iid);
  }
  public addTag(e: string, iid: number){
    this.hubConnection.invoke("AddAdm", e, iid);
  }

 /* public removeOld (a: string, iid: number){
    this.repo.get().subscribe(eve => {
      this.eveHome = eve;
      if (this.eveHome.key == null) {
        this.populateEsys();
      }
      this.eveSystems = this.eveHome.eveSystems;
      const data = this.eveSystems.filter(a => a.id === iid);
      for (let i = 0; i < data[0].adms.length; i++){
        if (data[0].adms[i].name === a) {
          data[0].adms.splice(i, 1);
        }
      }
      this.save();
    }), ( error => {
      console.log(error);
      this.populateEsys();
    });

  }


  public addTagOld(e: string, iid: number) {
    this.repo.get().subscribe(eve => {
      this.eveHome = eve;
      this.eveSystems = this.eveHome.eveSystems;
      const data = this.eveSystems.filter(a => a.id === iid);
      data[0].adms.push({name: e.toUpperCase(), id: 1, ts: new Date()});
      this.save();
    }), ( error => {
      console.log(error);
      this.populateEsys();
    });

  }*/
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
