import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule // Dodanie CommonModule do importów
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  post = {
    title: '',
    image: '',
    text: ''
  };

  constructor(private service: DataService, private router: Router) { }

  createPost() {
    if (this.post.title && this.post.image && this.post.text) {
      this.service.createPost(this.post).subscribe(response => {
        this.router.navigate(['/']);
      }, error => {
        console.error(error);
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
