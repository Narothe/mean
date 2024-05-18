import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FilterTextPipe} from "../../pipes/filter-text.pipe";

@Component({
  selector: 'blog',
  standalone: true,
  imports: [HttpClientModule, BlogItemComponent, CommonModule, FilterTextPipe],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  public items$: any;
  @Input() filterText?: string;

  constructor(private service: DataService) {
  }
  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
  }
}
