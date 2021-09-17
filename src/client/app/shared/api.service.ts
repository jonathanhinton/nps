import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Park } from './park.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    // AUTH HEADERS GO HERE
    // 'Authorization': `Bearer ${this.auth.getToken()
    })
  }

  getParks(): Observable<Park> {
    return this.http.get<Park>(this.baseUrl + '/parks');
      // .pipe(
      //   retry(1),
      //   catchError(this.httpError)
      // )
  }

  // httpError(error) {
  //   let msg = '';
  //   if(error.error instanceof ErrorEvent) {
  //     msg = error.error.message;
  //   } else {
  //     msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(msg);
  //   return throwError(msg);
  // }

}
