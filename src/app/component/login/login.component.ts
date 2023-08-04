import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;
  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const payload = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://agridata.hopto.org:9010/agridata-lga-backend/api/authentification/_checkauth', payload)
      .subscribe(
        (response: any) => {
          // Authentication successful
          console.log(response);
          // Handle success, such as storing the authentication token
          this.router.navigate(['table']);
        },
        (error) => {
          // Authentication failed
          console.error(error);
          this.errorMessage = 'Incorrect username or password.';
        }
      );
  }
}
