import { Component } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  post = {
    title: '',
    image: '',
    text: ''
  };
  constructor(private service: DataService, private router: Router) { }

  createPost() {
    this.service.createPost(this.post).subscribe(response => {
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
    });
  }
}
