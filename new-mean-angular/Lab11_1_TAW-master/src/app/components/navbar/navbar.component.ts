import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { BlogComponent } from '../blog/blog.component';
import { BlogHomeComponent } from '../blog-home/blog-home.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, SearchBarComponent, BlogComponent, BlogHomeComponent],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public filterText: string = '';

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void { }

  signOut() {
    this.authService.logout().subscribe((result: any) => {
      this.router.navigate(['/']);
      return result;
    });
  }

  getName($event: string): void {
    if (this.filterText !== $event) {
      this.filterText = $event;
      this.router.navigate(['/blog'], { queryParams: { name: this.filterText.toLowerCase() } });
    }
  }
}
