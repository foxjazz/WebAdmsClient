import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EveHome } from './models/model';


@Injectable({
  providedIn: 'root'
})
export class RepoService {
  private uri;
  private httpOptions;
  constructor(private http: HttpClient) {
    this.uri  = "https://localhost:5001/api/adm";
    this.uri = "https://webadms20190201075857.azurewebsites.net/api/adm";
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'asdf1234axdcv'
      })
    };
  }

  public save (data: EveHome): Observable<any> {

    return this.http.post<any>(this.uri, JSON.stringify(data), this.httpOptions);
  }
  public get(): Observable<EveHome> {
    return this.http.get<EveHome>(this.uri);
  }

}
