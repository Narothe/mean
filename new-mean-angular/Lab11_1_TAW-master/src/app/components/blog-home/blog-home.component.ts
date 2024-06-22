import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { BlogComponent } from '../blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [HttpClientModule, SearchBarComponent, BlogComponent],
  providers: [],
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {

  public filterText: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  getName($event: string): void {
    if (this.filterText !== $event) {
      this.filterText = $event;
      this.router.navigate(['/blog'], { queryParams: { name: this.filterText.toLowerCase() } });
    }
  }
}
