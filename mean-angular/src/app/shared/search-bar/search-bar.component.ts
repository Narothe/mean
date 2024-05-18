import {Component, EventEmitter, OnInit, Output} from
    '@angular/core';
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  public filterText: string = '';

  @Output() name = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  sendFilter(): void {
    this.name.emit(this.filterText);
  }
}
