import { Component, Input, OnInit } from '@angular/core';
import {SummaryPipe} from "../../pipes/summary.pipe";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'blog-item-text',
  standalone: true,
  imports: [SummaryPipe, RouterModule],
  templateUrl: './blog-item-text.component.html',
  styleUrl: './blog-item-text.component.css'
})
export class BlogItemTextComponent implements OnInit {
  @Input() text?: string;
  @Input() id?: number;

  constructor() { }

  ngOnInit(): void {
  }
}
