import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3001';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url + '/api/posts');
  }

  getById(id: string) {
    console.log('data-service -> id:', id)
    return this.http.get(this.url + '/api/posts/' + id);
  }

  createPost(post: any) {
    return this.http.post(this.url + '/api/posts', post);
  }


  deleteBlogItem(id: any) {
    return this.http.delete(this.url + '/api/posts/' + id);
  }
}

