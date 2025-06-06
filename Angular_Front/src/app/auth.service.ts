import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  // Récupérer la valeur courante synchroniquement
  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      this.loggedIn.next(true);
      return true;
    }
    this.loggedIn.next(false);
    return false;
  }

  logout() {
    this.loggedIn.next(false);
  }

  // Observable pour s'abonner aux changements de connexion
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
