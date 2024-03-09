import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true

})
export class AppComponent {
  title: any;

  constructor(private authService: AuthService) {
    // Attempt to login when the component initializes
    this.login();
  }

  login(): void {
    this.authService.login({
      email: 'Reibhen',
      password: 'password123'
    }).subscribe((response: any) => {
      // Handle successful login response
      console.log(response);
      this.handleLoginSuccess(response); // Handle success
    }, (error: HttpErrorResponse) => {
      // Handle login error response
      console.error('Login error:', error);
      this.handleLoginError(error); // Handle error
    });
  }

  handleLoginSuccess(response: any): void {
    // Check if login was successful based on response
    if (response.success) {
      console.log('Login successful!');
      // Here you can perform any action you want when login is successful,
      // such as redirecting the user to another page.
    } else {
      console.error('Login unsuccessful:', response.message);
      // Handle the case when the login was not successful
    }
  }

  handleLoginError(error: HttpErrorResponse): void {
    console.error('An error occurred while logging in:', error);
    // Handle the error response from the login API
    // For example, display an error message to the user or perform any other action
  }
}
