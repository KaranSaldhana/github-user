import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { UserDetails } from '../interface/user-details'

@Injectable({
  providedIn: 'root'
})
export class GithubUsersService {

  private githubUsersUrl = 'https://api.github.com/users/';  // URL to web api

  constructor(private http: HttpClient) { }

  private handleError<T>(message: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(message); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET GIthub User from github server */
  getGithubUser(username: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(this.githubUsersUrl + username, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        authorization: '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'
      }
    }).pipe(
      tap(users => users ? console.log('User Found') : console.log('User Not Found')),
      catchError(this.handleError<UserDetails>('User Not Found'))
    )
  }
}
