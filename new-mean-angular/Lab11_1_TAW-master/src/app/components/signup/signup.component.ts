import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ToastModule],
  providers: [AuthService, MessageService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public credentials = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() { }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 5 && password.length <= 15;
  }

  create() {
    if (!this.validateEmail(this.credentials.email)) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Nieprawidłowy adres email.' });
      return;
    }

    if (!this.validatePassword(this.credentials.password)) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Hasło musi zawierać od 5 do 15 znaków.' });
      return;
    }

    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Hasła nie są zgodne.' });
      return;
    }

    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Wszystkie pola są wymagane.' });
      return;
    }

    this.authService.createOrUpdate(this.credentials).subscribe((result) => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Rejestracja zakończona sukcesem.' });
        this.router.navigate(['/login']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Rejestracja nie powiodła się.' });
      }
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas rejestracji.' });
    });
  }
}
