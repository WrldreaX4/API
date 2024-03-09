import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  cpassword = '';

  constructor(private http: HttpClient) { }

  signup() {
    if (!this.username || !this.email || !this.password) {
      console.error('Username, email, and password are required.');
      return;
    }

    if (this.password !== this.cpassword) {
      console.error('Passwords do not match.');
      return;
    }

    this.http.post<any>('http://localhost/arco/api/signup', { username: this.username, email: this.email, password: this.password })
      .subscribe(
        (response) => {
          // Handle successful signup response
          console.log('Signup successful:', response);
          // Redirect to login page or navigate to another route
          // this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          // Handle signup error response
          console.error('Signup error:', error.error);
        }
      );
  }
}