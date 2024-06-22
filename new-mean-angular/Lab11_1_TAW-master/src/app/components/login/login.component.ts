import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MessageService } from 'primeng/api';
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ToastModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public credentials = {
    login: '',
    password: ''
  };

  public logged?: boolean;
  public logout?: boolean;

  constructor(public authService: AuthService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void { }

  signIn() {
    return this.authService.authenticate(this.credentials).subscribe((result) => {
      if (!result) {
        this.logged = false;
        console.error('Błędne logowanie: nieprawidłowy login lub hasło.');
        this.messageService.add({ severity: 'error', summary: 'Błąd logowania', detail: 'Nieprawidłowy login lub hasło.' });
      } else {
        console.log('Zalogowano pomyślnie.');
        this.logout = false;
        this.credentials = {
          login: '',
          password: ''
        };
        this.router.navigate(['/']);
      }
    }, (error) => {
      console.error('Wystąpił błąd podczas logowania:', error);
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas logowania.' });
    });
  }
}
