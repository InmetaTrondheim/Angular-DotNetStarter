import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class ValuesService {
  apiUrl = "http://localhost:5000/api/"

  constructor(private _http: HttpClient) { }

  GetValues(): Observable<string[]> {
    const url = this.apiUrl + 'values';
    return this._http.get<string[]>(url);
  }

  SendValue(value: string): Observable<string> {
    const url = this.apiUrl +  'values';
    return this._http.post<string>(url, '"' + value + '"');
  }
}