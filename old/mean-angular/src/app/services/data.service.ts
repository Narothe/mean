import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url + '/api/posts/'); // /api/data
  }

  getById(id: string | null) {
    return this.http.get(this.url + '/api/posts/' + id); // /api/data
  }

}

