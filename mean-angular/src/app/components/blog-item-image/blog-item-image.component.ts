import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'blog-item-image',
  standalone: true,
  imports: [],
  templateUrl: './blog-item-image.component.html',
  styleUrl: './blog-item-image.component.css'
})

export class BlogItemImageComponent implements OnInit {
  @Input() image?: string;
  constructor() { }

  ngOnInit(): void {
  }
}
