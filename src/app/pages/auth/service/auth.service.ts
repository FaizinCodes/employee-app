import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<any>(null);
  user$ = this.userSubject$.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject$.next(JSON.parse(user));
    }
  }

  login(data: any): Observable<user> {
    return this.http.post<user>(`${environment.apiUrlDomain}/login`, data).pipe(tap((user: user) => {
      this.userSubject$.next(this.user$)
      localStorage.setItem('user', JSON.stringify(user));
    }));
  }
}
