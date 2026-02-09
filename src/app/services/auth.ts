import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private loggedInUser: User | null = null;
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const user = this.getUserFromSession();
      if (user) {
        this.loggedInUser = user;
      }
    }
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(credentials: Pick<User, 'email' | 'password'>): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        switchMap(users => {
          if (users.length > 0) {
            this.loggedInUser = users[0];
            if (this.isBrowser) {
              this.saveUserToSession(this.loggedInUser);
            }
            return of(this.loggedInUser);
          }
          return of(null);
        })
      );
  }

  logout(): void {
    this.loggedInUser = null;
    if (this.isBrowser) {
      this.removeUserFromSession();
    }
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  getCurrentUser(): User | null {
    return this.loggedInUser;
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      switchMap(updatedUser => {
        this.loggedInUser = updatedUser;
        if (this.isBrowser) {
          this.saveUserToSession(updatedUser);
        }
        return of(updatedUser);
      })
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(() => {
        this.logout();
        return of(void 0);
      })
    );
  }

  private saveUserToSession(user: User): void {
    if (this.isBrowser) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    }
  }

  private getUserFromSession(): User | null {
    if (this.isBrowser) {
      const userJson = sessionStorage.getItem('loggedInUser');
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }

  private removeUserFromSession(): void {
    if (this.isBrowser) {
      sessionStorage.removeItem('loggedInUser');
    }
  }
}
