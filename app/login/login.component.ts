import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  submit: any;

  constructor(private router: Router, private http: HttpClient) { }

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }
  
    // Send login request to the server
    this.http.post<any>('http://localhost/arco/api/login', { email: this.email, password: this.password })
      .subscribe(
        (response: any) => {
          // Handle successful login response
          console.log('Login successful:', response);
          // Optionally, redirect the user to another page upon successful login
          this.router.navigate(['/home']);
        },
        (error: HttpErrorResponse) => {
          // Handle login error response
          console.error('Login error:', error);
          if (error.status === 400 && error.error && error.error.error === 'All input fields are required!') {
            // Display an error message to the user within the UI
            this.errorMessage = 'All input fields are required!';
          } else {
            // Handle other types of errors
            this.errorMessage = 'An error occurred while logging in. Please try again later.';
          }
        }
      );
  }
}
