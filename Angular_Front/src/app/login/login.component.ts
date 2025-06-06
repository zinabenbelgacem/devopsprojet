import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']  // <= Doit être là

})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
  const success = this.authService.login(this.username, this.password);
  if (success) {
    this.router.navigate(['home-view']); // ou la route principale après login
  } else {
    this.errorMessage = 'Invalid username or password';
  }
}

}
