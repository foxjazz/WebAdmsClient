import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EveHome } from './models/model';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RepoService {
  private uri;
  private srUri;
  private httpOptions;
  constructor(private http: HttpClient) {
    this.uri  = "https://localhost:5001/api/adm";
    this.uri = environment.serviceUri + "/api/adm";
    this.srUri = environment.serviceUri;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
  public getSRUri(): string{
      return this.srUri;
  }

  public save (data: EveHome): Observable<any> {

    return this.http.post<any>(this.uri, JSON.stringify(data), this.httpOptions);
  }
  public get(): Observable<EveHome> {
    return this.http.get<EveHome>(this.uri);
  }

}
