import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from "../../services/data.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [DataService],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.css'
})
export class BlogItemDetailsComponent implements OnInit {
  public image: string = '';
  public title: string = '';
  public text: string = '';
  public id: string = '';

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // let id: string = '';
    this.route.paramMap
      .subscribe((params: any) => {
        this.id = params.get('id');
      });

    this.service.getById(this.id).subscribe((res: any) => {
      const post = res;
      this.image = post['image'];
      this.title = post['title'];
      this.text = post['text'];
    });

  }

  deleteBlogItem() {
    this.service.deleteBlogItem(this.id).subscribe(() => {
      console.log('Usunięto post.');
      this.router.navigate(['/blog']);
    });

  }
}
