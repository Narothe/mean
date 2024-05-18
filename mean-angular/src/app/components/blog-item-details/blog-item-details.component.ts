import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.css'
})
export class BlogItemDetailsComponent {
  public image: string = 'http://osnews.pl/wp-content/uploads/2016/06/it-grafika.jpg';
  public text: string = 'Tytuł';
}
