import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, retry, tap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Park } from './park.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private parksUrl = environment.apiUrl + '/parks';

  constructor(
    private http: HttpClient, 
    private messageService: MessageService) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    // AUTH HEADERS GO HERE
    // 'Authorization': `Bearer ${this.auth.getToken()
    })
  }

  // GET all parks from server
  getParks(): Observable<Park[]> {
    return this.http.get<Park[]>(this.parksUrl)
       .pipe(
         catchError(this.handleError<Park[]>('getParks', []))
       );
  }

  // GET Park by id. Return 'undefined' if park id not found
  getParkNo404<Data>(id: string): Observable<Park> {
    const url = `${this.parksUrl}/?id=${id}`;
    return this.http.get<Park[]>(url)
      .pipe(
        map(parks => parks[0]),
        tap(p => {
          const outcome = p ? `fetched` : `did not find`;
          this.log(`${outcome} park id =${id}`);
        }),
        catchError(this.handleError<Park>(`getPark id=${id}`))
      );
  }

  // GET park by id. 404 if id not found
  getPark(id: string): Observable<Park> {
    const url = `${this.parksUrl}/${id}`;
    return this.http.get<Park>(url)
      .pipe(
        tap(_ => this.log(`fetched park id=${id}`)),
        catchError(this.handleError<Park>(`getPark id=${id}`))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add(`ApiService: ${message}`);
  }
  
}
