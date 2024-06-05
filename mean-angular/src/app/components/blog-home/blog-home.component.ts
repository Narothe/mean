import { Component, OnInit } from '@angular/core';
import {BlogComponent} from "../blog/blog.component";
import {SearchBarComponent} from "../../shared/search-bar/search-bar.component";

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [SearchBarComponent, BlogComponent],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css'
})
export class BlogHomeComponent implements OnInit {

  public filterText: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  getName($event: string): void {
    this.filterText = $event;
  }
}
